<template>
    <div class="modal fade" id="memberPayments" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="col-12 text-left px-0">
                        <button type="button" class="close btn-close" @click="close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h6 class="modal-title montserrat-bold text-capitalize">Member: {{ member_name }}</h6>
                    </div>
                </div>
                <div class="modal-body">
                    <b-table
						hover 
						:items="orders" 
						:fields="fields"
						:per-page="perPage"
						:current-page="currentPage"
						:responsive="true"
						:busy="isBusy"
						:show-empty="rows == 0">
						<template slot="table-busy">
							<div class="text-center text-success my-2">
								<b-spinner class="align-middle"></b-spinner>
								<strong>Loading...</strong>
							</div>
						</template>
						<template #empty>
							<div class="text-center">
								No orders found.
							</div>
						</template>
                        <template v-slot:cell(date_paid)="row">
                            {{ new Date(row.item.date_paid) | moment("MMMM D, YYYY") }}
                        </template>
						<template v-slot:cell(action)="row">
							<div class="actions same-size text-center">
                                <button class="btn btn-blue mb-2" title="View Deposit Slip" @click="showDepositSlip(row.item.depost_slip)">
									<i class="fas fa-eye"></i>
								</button>
                                <button class="btn btn-green btn-approve-payment mb-2" v-if="row.item.order.status !== 2"
                                    title="Mark as Approved" @click="approvePayment(row.item)">
									<i class="fas fa-check"></i>
								</button>
                                <button class="btn btn-blue mb-2" :class="'btn-resend-payment-' + row.item.id"
									@click="resendPaymentEmail(row.item)" title="Resend Payment Email">
									<i class="fas fa-envelope"></i>
								</button>
							</div>
						</template>
					</b-table>
					<div class="w-100 m-2" v-if="rows > 10">  
						<b-pagination
							v-model="currentPage"
							:total-rows="rows"
							:per-page="perPage"
							class="float-right green-pagination"
							prev-text="Previous"
							next-text="Next"
							first-number
							last-number
						></b-pagination>
					</div>
                </div>
            </div>
        </div>

        <ModalMemberDepositSlip ref="memberDepositSlipModal" />
    </div>
</template>

<script>
import $ from 'jquery';
import { disableButton, formatDecimal } from "~/components/Helper/functions.js"
export default {
    data() {
        return {
            member_name: "",
            orders: [],

            fields: [
				{ key: 'order.fee.name', label: 'Order', tdClass: "align-middle" },
                {
                    key: 'order.fee.amount', label: 'Order Amount', tdClass: "align-middle",
                    formatter(value) {
						return formatDecimal(value, 2)
					}
                },
                {
                    key: 'order.fee.late_amount', label: 'Order Late Amount', tdClass: "align-middle",
                    formatter(value) {
						return formatDecimal(value, 2)
					}
                },
                {
                    key: 'amount', label: 'Paid Amount', tdClass: "align-middle",
                    formatter(value) {
						return formatDecimal(value, 2)
					}
                },
                { key: 'order.order_status_name', label: 'Status', tdClass: "align-middle" },
                { key: 'date_paid', label: 'Date Paid', tdClass: "align-middle" },
				{ key: 'action', label: 'Actions', thClass: "text-center", tdClass: "align-middle" },
			],
			
			currentPage: 1,
			perPage: 10,
			isBusy: true,
        }
    },
    computed: {
        rows() {
            return this.orders.length
        }
    },
    methods: {
        openModal(id, member_name) {
            this.orders = []
            this.member_name = ""
            this.$store.dispatch("members/getPayments", id)
			.then(res => {
                this.orders = res.data
                this.member_name = member_name
                this.isBusy = false
                $(function() {
                    $('#memberPayments').modal('show');
                });
			})
			.catch(err => {
				this.$message.error(err)
                this.isBusy = false
			})
        },
        close() {
            $(function() {
                $('#memberPayments').modal('hide');
            });
        },
        showDepositSlip(slip) {
            if(slip !== null) {
                this.$refs.memberDepositSlipModal.openModal(slip.path)
            } else {
                this.$message.error("This payment has no deposit slip")
            }
        },
        approvePayment(payment) {
            let data = {
                order_id: payment.order_id,
                convention_member_id: payment.convention_member_id
            }

            disableButton('.btn-approve-payment', true)
            this.$store.dispatch("members/approvePayment", data)
			.then(res => {
                this.$message.success(res.data.message)
                this.close()
			})
			.catch(err => {
				this.$message.error(err)
                disableButton('.btn-approve-payment', false)
			})
        },
        resendPaymentEmail(payment) {
            this.$confirm('This will resend the Payments email to the member. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                let data = {
                    user_id: payment.member.user.id,
                    member_id: payment.member.id,
                    payment_id: payment.id
                }

                disableButton('.btn-resend-payment-' + payment.id, true)
                this.$store.dispatch("members/resendPaymentEmail", data)
                .then((res) => {
                    this.$message.success(res.data.message)
                    disableButton('.btn-resend-payment-' + payment.id, false)
                })
                .catch((err) => {
                    this.$message.error(err)
                    disableButton('.btn-resend-payment-' + payment.id, false)
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Cancelled'
                });
            });
		},
    }
}
</script>