<template>
	<div class="content-header" id="page-access">
		<div class="container-fluid">
            <div class="container-fluid mt-2 main">
                <div class="row justify-content-center">
                    <div class="col-lg-8 col-md-12">
                        <div class="bg-white corner-rounded p-3">
                            <div class="mb-3">
                                <div class="col-12 form-group">
                                    <label>Enable Sponsors (Exhibit Hall)?</label>
                                    <div>
                                        <button class="btn" :class="form.sponsors ? 'btn-green' : 'btn-orange'" @click="changeValue(!form.sponsors, 1, 'sponsors')">
                                            {{ form.sponsors ? "YES" : "NO" }}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <div class="col-12 form-group">
                                    <label>Enable Plenary?</label>
                                    <div>
                                        <button class="btn" :class="form.plenary ? 'btn-green' : 'btn-orange'" @click="changeValue(!form.plenary, 1, 'plenary')">
                                            {{ form.plenary ? "YES" : "NO" }}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="mb-3">
                                <div class="col-12 form-group">
                                    <label>Enable Mini Sessions?</label>
                                    <div>
                                        <button class="btn" :class="form.mini_sessions ? 'btn-green' : 'btn-orange'" @click="changeValue(!form.mini_sessions, 1, 'mini_sessions')">
                                            {{ form.mini_sessions ? "YES" : "NO" }}
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
                sponsors: null,
                plenary: null,
                mini_sessions: null,
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
        getAccessSettings() {
            this.$store.dispatch("settings/page-access/getAccessSettings")
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

			this.$store.dispatch("settings/page-access/updateField", data)
            .then(res => {
                this.$message.success(res.data.message)
                this.getAccessSettings()
            })
            .catch(err => {
                this.$message.error(err)
            })
        },
	},
    mounted() {
		this.setNavbarTitle('Page Access')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')

        this.getAccessSettings()
    } 
}
</script>