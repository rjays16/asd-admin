<template>
	<div class="content-header" id="delegates">
		<div class="container-fluid" v-if="user_role == super_admin_type" :data-role="user_role" :data-type="super_admin_type">
			<div class="container-fluid py-2">
				<div class="row">
					<div class="col-lg-9 col-md-12 pl-0 con-search-options">
						<el-upload
							class="el-auto upload-delegates row pl-2"
							action="/"
							:auto-upload="false"
							:accept="file_types_string"
							:show-file-list="false"
							:on-change="onChangeFile"
							:on-exceed="onExceed">
							<el-button class="btn btn-blue py-2 mr-3" slot="trigger">Select File for Bulk Upload</el-button>
							<button class="btn btn-green btn-import py-2 mr-3" @click="importFile">Upload</button>
							<!-- <button class="btn btn-green-inverse btn-dl-template" @click="downloadTemplate">Download Template</button> -->
							<el-select v-model="form.member_type" placeholder="Select Type" class="w-50">
                                <el-option
                                    v-for="option in types"
                                    :key="option.id"
                                    :label="option.name"
                                    :value="option.id" />
                            </el-select>
							<div v-if="form.file">
								<p class="my-2 note">{{ form.file.name }}</p>
								<button class="btn btn-red" @click="deleteFile()">
									Delete
								</button>
							</div>
						</el-upload>
					</div>
				</div>
			</div>
		</div>
		<div class="container-fluid">
			<div class="container-fluid mt-2 bg-white corner-rounded p-3">
				<div class="row filters my-3">
                    <div class="col-lg-4 col-md-12 mb-2">
                        <el-input v-model="searchTerm" placeholder="Search..." @input="searchDelegates" @clear="getDelegates(null)" suffix-icon="el-icon-search" clearable />
                    </div>
					<div class="col-lg-8 col-md-12 mb-2 text-right">
						<button class="btn btn-blue btn-get-all py-2" @click="getDelegates(true)">
							Show All Delegates
						</button>
                    </div>
                </div>
				<div class="row">
					<b-table
						hover
						:items="delegates"
						:fields="fields"
						:per-page="perPage"
						:current-page="currentPage"
						:filter="delegateCriteria"
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
								No delegates found.
							</div>
						</template>
						<template v-slot:cell(email)="row">
                            <a class="link-label" :href="'mailto: ' + row.item.user.email">{{ row.item.user.email }}</a>
                        </template>
						<template v-slot:cell(registration_type)="row">
							{{ row.item.registration_type ? row.item.registration_type.name : "Not set yet." }}
                        </template>
						<template v-slot:cell(status)="row">
							{{
								row.item.status
									?
										row.item.status == 1
										? "Pre-uploaded"
										: row.item.status == 3
											? "Registered"
											: row.item.user.user_status.name
									: "Not set yet."
							}}
                        </template>
						<template v-slot:cell(action)="row">
							<div class="actions same-size text-center">
								<a class="btn btn-blue mb-2" :href="`/delegates/edit/${row.item.id}`">
									<i class="fas fa-edit"></i>
								</a>
								<a class="btn btn-red mb-2" @click="deleteDelegate(row.item.id)">
									<i class="fas fa-times"></i>
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
import { createFormData, disableButton } from "~/components/Helper/functions.js"
export default {
	middleware: "auth",
	data() {
		return {
			searchTerm: null,

			fields: [
				{ key: 'user.full_name', label: 'Name', tdClass: "align-middle", sortable: true },
				{ key: 'user.email', label: 'Email', tdClass: "align-middle", sortable: true },
				{ key: 'type.name', label: 'Member Type', tdClass: "align-middle", sortable: true },
				{ key: 'status', label: 'Status', thClass: "text-center", tdClass: "align-middle text-uppercase" },
				{ key: 'action', label: 'Actions', thClass: "text-center", tdClass: "align-middle" }
			],

			rows: 0,
			currentPage: 1,
			perPage: 10,
			delegateCriteria: '',
            delegateFilterTimeout: null,
			isBusy: true,

			form: {
				file: null,
				member_type: 1,
			},

			file_url: null,
			file_url_change: false,
			file_url_deleted: false,
			file_types_string: `.csv, .xls, .xlsx, application/csv, application/x-csv,
				application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel`,
			file_types: [
				".csv", ".xls", ".xlsx", "application/csv", "application/x-csv",
				"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"
			],
			file_max: 10000000,

			types: this.$store.state.delegates.types,
			
			super_admin_type: this.$store.state.auth.super_admin_type,
			user_role: this.$store.state.auth.user_role,
		}
	},
	computed: {
		...mapGetters({
            delegates: 'delegates/getDelegates',
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
            clearTimeout(this.delegateFilterTimeout)
            this.delegateFilterTimeout = setTimeout(() => {
                this.delegateCriteria = this.searchTerm
                this.isBusy = false
            }, 300)
        },
		onFiltered(filtered_items) {
			this.rows = filtered_items.length
        	this.currentPage = 1
		},
		getDelegates(show_all) {
			let data = {
                is_search: null,
                keyword: null,
				show_all: show_all,
            }

			this.isBusy = true
			disableButton('.btn-get-all', true)
			this.$store.dispatch("delegates/getDelegates", data)
			.then(res => {
				this.rows = this.delegates.length
				this.isBusy = false
				disableButton('.btn-get-all', false)
			})
			.catch(err => {
				this.$message.error(err)
				this.isBusy = false
				disableButton('.btn-get-all', false)
			})
		},
		searchDelegates() {
			let value = this.searchTerm
            if(value.length >= 4) {
                let data = {
                    is_search: true,
                    keyword: value,
                }

				this.isBusy = true
                this.$store.dispatch("delegates/getDelegates", data)
                .then((res) => {
					this.rows = this.delegates.length
					this.isBusy = false
                })
                .catch((err) => {
					this.$message.error(err)
					this.isBusy = false
                })
            } else if(value.length == 0) {
				this.getDelegates(null)
			}
        },
		deleteDelegate(id) {
            this.$confirm('This will delete the delegate. Continue?', 'Warning', {
				confirmButtonText: 'OK',
				cancelButtonText: 'Cancel',
				type: 'warning'
			}).then(() => {
				this.$store.dispatch("delegates/delete", id)
				.then((res) => {
					this.$message.success(res.data.message)
					this.getDelegates()
				})
				.catch((err) => {
					this.$message.error(err)
				})
			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Delete Cancelled'
				});
			});
		},
		onExceed() {
			this.$message.info('Select one file only per upload.')
		},
		onChangeFile(file) {
            this.validateFile(file.raw, "photo", (result) => {
                if (result == true) {
                    this.form.file = file.raw;
                    this.prod_img_url = URL.createObjectURL(file.raw);
                    this.prod_img_url_change = true;
                }
            });
        },
        validateFile(file, type, callback) {
            let valid_types = this.file_types;
            if (!file) {
                callback(false);
            } else if (file.size > this.file_max) {
                this.$message.error("File is too big!");
                callback(false);
            } else if (!valid_types.includes(file.type)) {
                this.$message.error("Invalid file type");
                callback(false);
            } else {
                callback(true);
            }
        },
		deleteFile() {
			this.form.file = null;
			this.file_url = null;
			this.file_url_change = true;
			this.file_url_deleted = true;
		},
		importFile() {
			if(!this.form.file) {
				this.$message.error('Please select a file for upload.')
			} else if(!this.form.member_type) {
                this.$message.error('Please select the type of delegate from the dropdown.')
            } else {
				disableButton('.btn-import', true)
				let properties = Object.keys(this.form)
				let form = createFormData(this.form, properties)

				this.$store.dispatch("delegates/import", form)
				.then(res => {
					this.$message.success(res.data.message)
					this.getDelegates()
					this.deleteFile()
					disableButton('.btn-import', false)
				})
				.catch(err => {
					this.$message.error('Something went wrong. Please contact the site admin.')
					disableButton('.btn-import', false)
				})
			}
		},
		downloadTemplate() {
			disableButton('.btn-dl-template', true)
			this.$store.dispatch("delegates/exportTemplate")
			.then(res => {
				const url = URL.createObjectURL(new Blob([res.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', "delegates_template.xlsx")
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
				disableButton('.btn-dl-template', false)
			})
			.catch(err => {
				this.$message.error('Could not export the template. Please contact the site admin.')
				disableButton('.btn-dl-template', false)
			})
		}
	},
    mounted() {
		this.setNavbarTitle('Delegates')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

		this.getDelegates(null)
    }
}
</script>
