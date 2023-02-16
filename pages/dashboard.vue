<template>
	<div class="dashboard">
		<div class="main-banner" :style="'background-image: url(' + mainBanner + ');'">
			<h1 class="title text-center">
				ASD Admin
			</h1>
		</div>
	</div>
</template>

<script>
export default {
	middleware: "auth",
	data() {
		return {
			shopName: "ASD",
			showAdvanced: false,
			mainBanner: require('~/static/img/banner-mobile.png')
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
	},
    mounted() {
		this.setNavbarTitle('Dashboard')
		this.setNavbarSubpageTitle('')
		this.setNavbarIcon('')
    } 
}
</script>

<style lang="scss" scoped>
.main-banner {
	display: flex;
	align-items: center;
	flex-direction: column; 
	justify-content: center;
	width: 100%;
	background-position: center center;
	background-size: cover;
	min-height: 300px;
	.title {
		color:#fff;
		text-shadow: -1px -1px 0 #000,  
			1px -1px 0 #000,
			-1px 1px 0 #000,
			1px 1px 0 #000;
		font-weight: 700;
		text-transform: uppercase;
	}
}

@media only screen and (max-width: 472px) {
	.dashboard {
		padding-top: 1.5rem;
	}
}  	
</style>