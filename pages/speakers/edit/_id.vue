<template>
	<div class="content-header" id="edit-vip">
		<div class="container-fluid">
            <div class="container-fluid mt-2 main">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-12">
                        <div class="bg-white corner-rounded p-3">
                            <div class="mb-3">
                                <label>First Name</label>
                                <el-input placeholder="First Name" v-model="$v.form.first_name.$model" class="el-uppercase" @input="form.first_name = toUpper($event)" />
                                <div v-if="$v.form.first_name.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.first_name.required">Required Field</div>
                                    <div class="note color-FF2C2C" v-if="!$v.form.first_name.maxLength">Max of {{ $v.form.first_name.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Middle Initial</label>
                                <el-input placeholder="Middle Initial" v-model="$v.form.middle_name.$model" class="el-uppercase" @input="form.middle_name = toUpper($event)" />
                                <div v-if="$v.form.middle_name.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.middle_name.maxLength">Max of {{ $v.form.middle_name.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Last Name</label>
                                <el-input placeholder="Last Name" v-model="$v.form.last_name.$model" class="el-uppercase" @input="form.last_name = toUpper($event)" />
                                <div v-if="$v.form.last_name.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.last_name.required">Required Field</div>
                                    <div class="note color-FF2C2C" v-if="!$v.form.last_name.maxLength">Max of {{ $v.form.last_name.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Certificate Name</label>
                                <el-input placeholder="Certficate Name" v-model="$v.form.certificate_name.$model" class="el-uppercase" @input="form.certificate_name = toUpper($event)" />
                                <div v-if="$v.form.certificate_name.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.certificate_name.required">Required Field</div>
                                    <div class="note color-FF2C2C" v-if="!$v.form.certificate_name.maxLength">Max of {{ $v.form.last_name.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Email</label>
                                <el-input placeholder="Email" v-model="$v.form.email.$model" />
                                <div v-if="$v.form.email.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.email.maxLength">Max of {{ $v.form.email.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>PRC Number</label>
                                <el-input placeholder="PRC Number" v-model="$v.form.prc_license_number.$model" />
                                <div v-if="$v.form.prc_license_number.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.prc_license_number.maxLength">Max of {{ $v.form.prc_license_number.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>PMA Number</label>
                                <el-input placeholder="PMA Number" v-model="$v.form.pma_number.$model" />
                                <div v-if="$v.form.pma_number.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.pma_number.maxLength">Max of {{ $v.form.pma_number.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Country</label>
                                <el-select v-model="$v.form.country.$model" clearable filterable class="w-100" placeholder="Country" autocomplete="off">
                                    <el-option
                                        v-for="option in countries"
                                        :key="option.id"
                                        :label="option.name"
                                        :value="option.name" />
                                </el-select>
                                <div v-if="$v.form.country.$dirty">
                                    <div class="note-small color-FF2C2C" v-if="!$v.form.country.required">Required</div>
                                </div>
                            </div>

                            <!-- <div class="mb-3">
                                <label>Member Type</label>
                               <el-select v-model="$v.form.type.$model" clearable filterable class="w-100" placeholder="Member Type" autocomplete="off">
                                    <el-option
                                        v-for="option in types"
                                        :key="option.id"
                                        :label="option.name"
                                        :value="option.name" />
                                </el-select>
                                <div v-if="$v.form.type.$dirty">
                                    <div class="note-small color-FF2C2C" v-if="!$v.form.type.required">Required</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Member Sub Type</label>
                                <el-select v-model="$v.form.sub_type.$model" clearable filterable class="w-100" placeholder="Member Sub Type" autocomplete="off">
                                    <el-option
                                        v-for="option in vip_types"
                                        :key="option.id"
                                        :label="option.name"
                                        :value="option.name" />
                                </el-select>
                                <div v-if="$v.form.sub_type.$dirty">
                                    <div class="note-small color-FF2C2C" v-if="!$v.form.sub_type.required">Required</div>
                                </div>
                            </div> -->

                            <div class="text-right mt-4">
                                <button class="btn btn-green-inverse btn-cancel" @click="cancel">
                                    Cancel
                                </button>
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
import { mapGetters } from "vuex"
import { required, maxLength, requiredIf } from 'vuelidate/lib/validators'
import { disableButton, toUpper } from "~/components/Helper/functions.js"
export default {
    middleware: "auth",
	data() {
		return {
            form: {
                is_good_standing: false,
                first_name: null,
                middle_name: null,
                last_name: null,
                certificate_name: null,
                email: null,
                country: null,
                prc_license_number: null,
                pma_number: null,
                type: null,
                sub_type: null,
                vip_id: null,
            },

            yesNoOptions: this.$store.state.options.yesNoOptions,
            types: this.$store.state.vips.types,
            vip_types:this.$store.state.vips.sub_types,
		}
	},
    computed: {
        ...mapGetters({
            countries: 'options/getCountries',
        }),
    },
    validations: {
        form: {
			first_name: {
				required,
				maxLength: maxLength(255)
			},
			middle_name: {
				maxLength: maxLength(255)
			},
			last_name: {
				required,
				maxLength: maxLength(255)
			},
            certificate_name: {
                required,
                maxLength: maxLength(255)
            },
            email: {
				maxLength: maxLength(255)
			},
            prc_license_number: {
                maxLength: maxLength(255)
            },
            pma_number: {
                maxLength: maxLength(255)
            },
            country: {
                required,
                maxLength: maxLength(255)
            },
            type: {
                required,
                maxLength: maxLength(255)
            },
            sub_type: {
                required,
                maxLength: maxLength(255)
            },
		},
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
        getVIP() {
            this.$store.dispatch("vips/getVIP", this.$route.params.id)
            .then((res) => {
                let user_data = res.data.user
                let vip_data = res.data
                
                this.form.id = user_data.id
                this.form.email = user_data.email
				this.form.first_name = user_data.first_name
				this.form.middle_name = user_data.middle_name
				this.form.last_name = user_data.last_name
                this.form.certificate_name = user_data.certificate_name
				this.form.country = user_data.country

				this.form.vip_id = vip_data.id
                this.form.type = vip_data.type
				this.form.prc_license_number = vip_data.prc_license_number
				this.form.pma_number = vip_data.pma_number
                this.form.sub_type = vip_data.sub_type
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
            this.$store.dispatch("vips/update", this.form)
            .then(res => {
                this.$message.success(res.data.message)
                setTimeout(() => {
                    this.$router.push('/vips')
                }, 1000);
            })
            .catch(err => {
                this.$message.error(err)
                disableButton('.btn-save', false)
            })
        },
        toUpper(value) {
            return toUpper(value)
        },
        cancel(){
            this.$router.push('/vips')
        }
	},
    mounted() {
		this.setNavbarTitle('VIPs')
		this.setNavbarSubpageTitle('Edit')
        this.setNavbarIcon('')

        this.getVIP()
        this.$store.dispatch("options/getCountries")
    } 
}
</script>