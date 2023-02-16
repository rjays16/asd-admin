<template>
	<div class="content-header" id="fees">
		<!-- {{ user_role }} -->
		<!-- {{ super_admin_type }} -->
		<div class="container-fluid" v-if="user_role == super_admin_type">
			<div class="container-fluid py-2">
				<div class="row">
					<div class="col-12 pl-0">
						<a class="btn btn-blue border" href="/fees/add">
							Add Fee
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="container-fluid">
			<div class="container-fluid mt-2 bg-white corner-rounded p-3">
				<div class="row filters my-3">
                    <div class="col-4">
                        <el-input v-model="searchTerm" placeholder="Search..." @input="search" suffix-icon="el-icon-search" clearable />
                    </div>
                </div>
				<div class="row">
					<b-table
						hover 
						:items="fees"
						:fields="fields"
						:per-page="perPage"
						:current-page="currentPage"
						:filter="feeCriteria"
						:responsive="true"
						:busy="isBusy"
						class="m-2"
						:show-empty="rows == 0"
						@filtered="onFiltered">
						<template slot="table-busy">
							<div class="text-center text-success my-2">
								<b-spinner class="align-middle"></b-spinner>
								<strong>Loading...</strong>
							</div>
						</template>
						<template #empty>
							<div class="text-center">
								No fees found.
							</div>
						</template>
						<template v-slot:head(action)>
							{{ user_role == super_admin_type ? "Actions" : "" }}
						</template>
						<template v-slot:cell(action)="row" v-if="user_role == super_admin_type">
							<div class="actions same-size text-center">
								<a class="btn btn-blue mb-2" :href="`/fees/edit/${row.item.id}`">
									<i class="fas fa-edit"></i>
								</a>
							</div>
						</template>
					</b-table>
					<div class="w-100 m-2" v-if="rows > 0">  
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
	</div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
	middleware: "auth",
	data() {
		return {
			searchTerm: null,
			
			fields: [
				{ key: 'name', label: 'Name', tdClass: "align-middle" },
				{ key: 'description', label: 'Description', tdClass: "align-middle" },
				{ key: 'action', label: 'Actions', thClass: "text-center", tdClass: "align-middle" },
			],
			
			rows: 0,
			currentPage: 1,
			perPage: 10,
			feeCriteria: '',
            feeFilterTimeout: null,
			isBusy: false,

			super_admin_type: this.$store.state.auth.super_admin_type,
			user_role: this.$store.state.auth.user_role,
		}
	},
	computed: {
		...mapGetters({
            fees: 'fees/getFees',
        }),
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
		search() {
            this.isBusy = true
            clearTimeout(this.feeFilterTimeout)
            this.feeFilterTimeout = setTimeout(() => {
                this.feeCriteria = this.searchTerm
                this.isBusy = false
            }, 300)
        },
		onFiltered(filtered_items) {
			this.rows = filtered_items.length
        	this.currentPage = 1
		},
		getFees() {
			this.$store.dispatch("fees/getFees")
			.then(res => {
				this.rows = this.fees.length
				this.isBusy = false
			})
			.catch(err => {
				this.$message.error(err)
				this.isBusy = false
			})
		},
	},
    mounted() {
		this.setNavbarTitle('Fees')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

		this.getFees()
    } 
}
</script>