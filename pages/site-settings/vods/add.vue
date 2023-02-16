<template>
	<div class="content-header" id="add-vod">
		<div class="container-fluid">
            <div class="container-fluid mt-2 main">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-12">
                        <div class="bg-white corner-rounded p-3">
                            <div class="mb-3">
                                <label>Name</label>
                                <el-input placeholder="Name" v-model="$v.form.name.$model" />
                                <div v-if="$v.form.name.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.name.required">Required Field</div>
                                    <div class="note color-FF2C2C" v-if="!$v.form.name.maxLength">Max of {{ $v.form.name.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Type</label>
                                <el-select v-model="$v.form.type.$model" placeholder="Select" class="w-100">
                                    <el-option
                                        v-for="option in vodTypes"
                                        :key="option.id"
                                        :label="option.name"
                                        :value="option.id" />
                                </el-select>
                                <div v-if="$v.form.type.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.type.required">Required Field</div>
                                </div>
                            </div>
                            
                            <div class="mb-3">
                                <label>Iframe</label>
                                <el-input type="textarea" v-model="$v.form.iframe.$model" :rows="4" />
                                <div v-if="$v.form.iframe.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.iframe.required">Required Field</div>
                                </div>
                            </div>                            

                            <div class="text-right mt-4">
                                <a class="btn btn-green-inverse" href="/site-settings/vods">
                                    Cancel
                                </a>
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
import { required, maxLength } from 'vuelidate/lib/validators'
import { disableButton } from "~/components/Helper/functions.js"
export default {
    middleware: "auth",
	data() {
		return {
            form: {
                name: null,
                type: null,
                iframe: null,
            },

            vodTypes: [],
		}
	},
    validations: {
        form: {
            name: {
                required,
                maxLength: maxLength(255)
            },
            type: {
                required,
            },
            iframe: {
                required,
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
        getVodTypes() {
            this.$store.dispatch("settings/vods/getVodTypes")
            .then(res => {
                this.vodTypes = res.data
            })
            .catch(err => {
                console.error(err)
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
            this.$store.dispatch("settings/vods/create", this.form)
            .then(res => {
                this.$message.success(res.data.message)
                setTimeout(() => {
                    this.$router.push('/site-settings/vods')
                }, 1000);
            })
            .catch(err => {
                this.$message.error(err)
                disableButton('.btn-save', false)
            })
        }
	},
    mounted() {
		this.setNavbarTitle('Video on Demand')
		this.setNavbarSubpageTitle('Add')
        this.setNavbarIcon('')

        this.getVodTypes()
    } 
}
</script>