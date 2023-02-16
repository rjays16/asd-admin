<template>
    <div class="modal fade" id="password-request-reset" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="col-12 text-left">
                        <button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 class="modal-title dmsans-bold" id="subscription-info-title">Send Password Reset Request</h5>
                    </div>
                </div>
                <div class="modal-body text-left">
                    <div class="col-md-12 pb-3">
                        <p class="mb-2">Email Address</p>
                        <el-input v-model="$v.form.email.$model" />
                        <div v-if="$v.form.email.$dirty">
                            <div class="note color-FF2C2C" v-if="!$v.form.email.required">Required Field</div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer text-center">
                    <button type="button" class="btn btn-blue btn-send white px-4 py-2" @click="recheckInputs">
                        Send
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { disableButton } from "~/components/Helper/functions.js"
export default {
    data() {
        return {
            form: {
                email: null,
            },
        }
    },
    validations: {
        form: {
            email: {
                required,
            },
        }
    },
    methods: {
        recheckInputs() {
            this.$v.$touch()
            if(this.$v.$invalid) {
                this.$message.error("Please fill in the required fields.")
            } else {
                this.sendRequest()
            }
        },
        sendRequest() {
            disableButton('.btn-send', true)
            this.$store.dispatch("auth/sendPasswordResetRequest", this.form)
            .then((res) => {
                this.$message.success("Successfully sent request. Please check your email.")
                $('.btn-close').click()
                disableButton('.btn-send', false)
            })
            .catch((err) => {
                this.$message.error(err)
                disableButton('.btn-send', false)
            });
        }
    }
}
</script>