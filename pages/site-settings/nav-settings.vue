<template>
	<div class="content-header" id="nav-settings">
		<div class="container-fluid">
            <div class="container-fluid mt-2 main">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-12">
                        <div class="bg-white corner-rounded p-3">
                            <div class="mb-3">
                                <div class="col-12 form-group">
                                    <label>Show Events in Nav?</label>
                                    <div>
                                        <button class="btn" :class="form.events ? 'btn-green' : 'btn-orange'" @click="changeValue(!form.events, 1, 'events')">
                                            {{ form.events ? "YES" : "NO" }}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <div class="col-12 form-group">
                                    <label>Show Virtual Tour in Nav?</label>
                                    <div>
                                        <button class="btn" :class="form.virtual_tour ? 'btn-green' : 'btn-orange'" @click="changeValue(!form.virtual_tour, 1, 'virtual_tour')">
                                            {{ form.virtual_tour ? "YES" : "NO" }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
export default {
    middleware: "auth",
	data() {
		return {
            form: {
                events: null,
                virtual_tour: null,
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
        getNavSettings() {
            this.$store.dispatch("settings/nav-settings/getNavSettings")
            .then((res) => {
                this.form = res.data
            })
            .catch((err) => {
                this.$message.error(err)
            })
        },
        changeValue(value, id, field) {
			let data = {
				id: id,
				value: value,
                field: field
			}

			this.$store.dispatch("settings/nav-settings/updateField", data)
            .then(res => {
                this.$message.success(res.data.message)
                this.getNavSettings()
            })
            .catch(err => {
                this.$message.error(err)
            })
        },
	},
    mounted() {
		this.setNavbarTitle('Nav Settings')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

        this.getNavSettings()
    } 
}
</script>