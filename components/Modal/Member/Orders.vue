<template>
    <div class="modal fade" id="memberOrders" tabindex="-1" role="dialog">
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
                                <button class="btn btn-blue mb-2" title="Upload Deposit Slip" @click="showUploadDepositSlip(row.item.id, row.item.convention_member_id)">
									<i class="fas fa-file-upload"></i>
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
        
		<ModalMemberUploadDepositSlip ref="uploadDepositSlipModal"/>
    </div>
</template>

<script>
import $ from 'jquery';
import { formatDecimal } from "~/components/Helper/functions.js"
export default {
    data() {
        return {
            member_name: "",
            orders: [],

            fields: [
				{ key: 'fee.name', label: 'Order', tdClass: "align-middle" },
                {
                    key: 'fee.amount', label: 'Order Amount', tdClass: "align-middle",
                    formatter(value) {
						return formatDecimal(value, 2)
					}
                },
                {
                    key: 'fee.late_amount', label: 'Order Late Amount', tdClass: "align-middle",
                    formatter(value) {
						return formatDecimal(value, 2)
					}
                },
                {
                    key: 'raw_order_payments', label: 'Paid Amount', tdClass: "align-middle",
                    formatter(value) {
						return formatDecimal(value, 2)
					}
                },
                { key: 'order_status_name', label: 'Status', tdClass: "align-middle" },
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
            this.$store.dispatch("members/getOrders", id)
			.then(res => {
                this.orders = res.data
                this.member_name = member_name
                this.isBusy = false
                $(function() {
                    $('#memberOrders').modal('show');
                });
			})
			.catch(err => {
				this.$message.error(err)
                this.isBusy = false
			})
        },
        close() {
            $(function() {
                $('#memberOrders').modal('hide');
            });
        },
        showUploadDepositSlip(order_id, member_id) {
            this.$refs.uploadDepositSlipModal.openModal(order_id, member_id, this.member_name)
        }
    }
}
</script>