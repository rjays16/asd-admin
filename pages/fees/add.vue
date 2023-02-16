<template>
	<div class="content-header" id="edit-fee">
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
                                <label>Description</label>
                                <el-input type="textarea" :rows="4" placeholder="Description" v-model="$v.form.description.$model" maxlength="255" show-word-limit />
                                <div v-if="$v.form.description.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.description.maxLength">Max of {{ $v.form.description.$params.maxLength.max }} characters.</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Year</label>
                                <el-date-picker v-model="$v.form.year.$model" type="year" value-format="yyyy" class="w-100" :picker-options="availableDateOptions" />
                                <div v-if="$v.form.year.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.year.required">Required Field</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Fee Type</label>
                                <el-select class="d-block" v-model="form.type" placeholder="Select Fee Type">
                                    <el-option v-for="option in types" :key="option.id" :label="option.name" :value="option.id" />
                                </el-select>
                            </div>

                            <div class="mb-3">
                                <label>What is the scope of this fee?</label>
                                <el-select class="d-block" v-model="form.scope" placeholder="Select">
                                    <el-option v-for="option in scopes" :key="option.value" :label="option.name" :value="option.value" />
                                </el-select>
                            </div>

                            <div class="mb-3">
                                <label>Amount</label>
                                <el-input-number v-model="$v.form.amount.$model" :precision="2" :step="0.01" controls-position="right" class="w-100" />
                                <div v-if="$v.form.amount.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.amount.required">Required Field</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>International Amount (USD)</label>
                                <el-input-number v-model="$v.form.intl_amount.$model" :precision="2" :step="0.01" controls-position="right" class="w-100" />
                                <div v-if="$v.form.intl_amount.$dirty">
                                    <div class="note color-FF2C2C" v-if="!$v.form.intl_amount.required">Required Field</div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label>Does it use a late registration fee?</label>
                                <div>
                                    <el-radio v-model="form.uses_late_amount"
                                        v-for="option in yesNo"
                                        :key="option.id"
                                        :label="option.value"
                                        :value="option.value"
                                        class="blue-input montserrat-light">
                                        {{ option.name }}
                                    </el-radio>
                                </div>
                            </div>

                            <div v-if="form.uses_late_amount">
                                <div class="mb-3">
                                    <label>Late Registration Amount</label>
                                    <el-input-number v-model="$v.form.late_amount.$model" :precision="2" :step="0.01" controls-position="right" class="w-100" />
                                    <div v-if="$v.form.late_amount.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.late_amount.required">Required Field</div>
                                    </div>
                                </div>

                                <div class="mb-3">
                                    <label>Late Registration Starts on</label>
                                    <el-date-picker v-model="$v.form.late_amount_starts_on.$model" value-format="yyyy-MM-dd"
                                        class="w-100" :picker-options="availableDateOptions" />
                                    <div v-if="$v.form.late_amount_starts_on.$dirty">
                                        <div class="note color-FF2C2C" v-if="!$v.form.late_amount_starts_on.required">Required Field</div>
                                    </div>
                                </div>
                            </div>

                            <div class="text-right mt-4">
                                <a class="btn btn-green-inverse" href="/fees">
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
import { required, maxLength, requiredIf } from 'vuelidate/lib/validators'
import { disableButton } from "~/components/Helper/functions.js"
export default {
    middleware: "auth",
	data() {
		return {
            form: {
                type: null,
                name: null,
                description: null,
                year: "",
                scope: false,
                amount: null,
                intl_amount: null,
                status: true,
                late_amount: 0,
                late_amount_starts_on: null,
                uses_late_amount: false,
            },

            yesNo: this.$store.state.options.yesNoOptions,
            activeOptions: this.$store.state.options.activeOptions,
            availableDateOptions: this.$store.state.options.availableDateOptions,
            types: this.$store.state.fees.types,
            scopes: this.$store.state.fees.scopes
		}
	},
    validations: {
        form: {
            name: {
                required,
                maxLength: maxLength(255)
            },
            description: {
                maxLength: maxLength(255)
            },
            year: {
                required,
            },
            amount: {
                required,
            },
            intl_amount: {
                required,
            },
            late_amount: {
                required: requiredIf(function() {
                    return this.form.uses_late_amount
                }),
            },
            late_amount_starts_on: {
                required: requiredIf(function() {
                    return this.form.uses_late_amount
                }),
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
            this.$store.dispatch("fees/create", this.form)
            .then(res => {
                this.$message.success(res.data.message)
                setTimeout(() => {
                    this.$router.push('/fees')
                }, 1000);
            })
            .catch(err => {
                this.$message.error(err)
                disableButton('.btn-save', false)
            })
        }
	},
    mounted() {
		this.setNavbarTitle('Fees')
		this.setNavbarSubpageTitle('Add')
        this.setNavbarIcon('')
    } 
}
</script>