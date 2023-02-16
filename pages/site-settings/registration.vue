<template>
	<div class="content-header" id="registration-switch">
		<div class="container-fluid">
            <div class="container-fluid mt-2 main">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-12">
                        <div class="bg-white corner-rounded p-3">
                            <div class="mb-3">
                                <div class="col-12 form-group">
                                    <label>Enable registration?</label>
                                    <div>
                                        <el-radio v-model="$v.form.value.$model"
                                            v-for="option in yesNoOptions"
                                            :key="option.id"
                                            :label="option.value"
                                            :value="option.value"
                                            class="blue-input montserrat-light">
                                            {{ option.name }}
                                        </el-radio>
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
import { disableButton } from "~/components/Helper/functions.js"
export default {
    middleware: "auth",
	data() {
		return {
            form: {
                value: null,
            },

            yesNoOptions: this.$store.state.options.yesNoOptions,
		}
	},
    validations: {
        form: {
            value: {
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
        getSchedule() {
            this.$store.dispatch("settings/registration/getSettings")
            .then((res) => {
                this.form.value = res.data
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
            this.$store.dispatch("settings/registration/update", this.form)
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
		this.setNavbarTitle('Registration Switch')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

        this.getSchedule()
    } 
}
</script>