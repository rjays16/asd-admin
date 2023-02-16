<template>
	<div class="content-header" id="welcome-message">
		<div class="container-fluid">
            <div class="container-fluid mt-2 main">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-12">
                        <div class="bg-white corner-rounded p-3">
                            <div class="mb-3">
                                <div class="col-12 form-group">
                                    <label>Content</label>
                                    <vue-editor v-model="$v.form.content.$model" />
                                    <div v-if="$v.form.content.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.content.required">Required Field</div>
                                    </div>
                                </div>
                            </div>

                            <div class="text-right mt-4">
                                <button class="btn btn-green btn-save" @click="recheckInputs">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { createFormData, disableButton } from "~/components/Helper/functions.js"
export default {
    middleware: "auth",
	data() {
		return {
            form: {
                content: null
            },
		}
	},
    validations: {
        form: {
            content: {
                required
            },
        }
    },
	methods: {
        setNavbarTitle(title) {
            this.$store.commit('SET_NAVBAR_TITLE', title)
        },
		setNavbarIcon(icon) {
            this.$store.commit('SET_NAVBAR_ICON', icon)
        },
		setNavbarSubpageTitle(subtitle) {
            this.$store.commit('SET_NAVBAR_SUBPAGE_TITLE', subtitle)
        },
        getMessage() {
            this.$store.dispatch("settings/banner/getMessage")
            .then((res) => {
                this.form = res.data
            })
            .catch((err) => {
                this.$message.error(err.response.data.message)
            })
        },
        recheckInputs() {
            this.$v.$touch()
            if(this.$v.$invalid) {
                this.$message.error("Please fill in the required fields.")
            } else {
                this.save()
            }
        },
        save() {
            disableButton('.btn-save', true)
            let properties = Object.keys(this.form)
            let form = createFormData(this.form, properties)

            this.$store.dispatch("settings/banner/updateMessage", form)
            .then(res => {
                this.$message.success(res.data.message)
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            })
            .catch(err => {
                this.$message.error('Please fill in the required fields.')
                disableButton('.btn-save', false)
            })
        }
	},
    mounted() {
		this.setNavbarTitle('Welcome Message')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

        this.getMessage()
    } 
}
</script>