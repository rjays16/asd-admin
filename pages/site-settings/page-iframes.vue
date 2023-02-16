<template>
	<div class="content-header" id="terms-and-conditions">
		<div class="container-fluid">
            <div class="container-fluid mt-2 main">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-12">
                        <div class="bg-white corner-rounded p-3">
                            <div class="mb-3">
                                <div class="col-12 form-group">
                                    <label>Facade</label>
                                    <el-input type="textarea" :rows="8" v-model="$v.form.facade.$model" />
                                    <div v-if="$v.form.facade.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.facade.required">Required Field</div>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <div class="col-12 form-group">
                                    <label>Entrance</label>
                                    <el-input type="textarea" :rows="8" v-model="$v.form.entrance.$model" />
                                    <div v-if="$v.form.entrance.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.entrance.required">Required Field</div>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <div class="col-12 form-group">
                                    <label>Lobby</label>
                                    <el-input type="textarea" :rows="8" v-model="$v.form.lobby.$model" />
                                    <div v-if="$v.form.lobby.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.lobby.required">Required Field</div>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <div class="col-12 form-group">
                                    <label>Sponsors</label>
                                    <el-input type="textarea" :rows="8" v-model="$v.form.sponsors.$model" />
                                    <div v-if="$v.form.sponsors.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.sponsors.required">Required Field</div>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <div class="col-12 form-group">
                                    <label>Plenary</label>
                                    <el-input type="textarea" :rows="8" v-model="$v.form.plenary.$model" />
                                    <div v-if="$v.form.plenary.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.plenary.required">Required Field</div>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <div class="col-12 form-group">
                                    <label>Mini Sessions</label>
                                    <el-input type="textarea" :rows="8" v-model="$v.form.mini_sessions.$model" />
                                    <div v-if="$v.form.mini_sessions.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.mini_sessions.required">Required Field</div>
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
                facade: null,
                entrance: null,
                lobby: null,
                sponsors: null,
                plenary: null,
                mini_sessions: null,
            },
		}
	},
    validations: {
        form: {
            facade: {
                required
            },
            entrance: {
                required
            },
            lobby: {
                required
            },
            sponsors: {
                required
            },
            plenary: {
                required
            },
            mini_sessions: {
                required
            }
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
        getIframes() {
            this.$store.dispatch("settings/page-iframes/getIframes")
            .then((res) => {
                this.form = res.data
            })
            .catch((err) => {
                this.$message.error(err)
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
            this.$store.dispatch("settings/page-iframes/update", this.form)
            .then(res => {
                this.$message.success(res.data.message)
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            })
            .catch(err => {
                this.$message.error(err)
                disableButton('.btn-save', false)
            })
        }
	},
    mounted() {
		this.setNavbarTitle('Page Iframes')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

        this.getIframes()
    } 
}
</script>