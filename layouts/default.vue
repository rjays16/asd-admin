<template>
	<div class="wrapper">
		<!-- Navbar -->
		<LayoutNavbar />
		<!-- /.navbar -->

		<!-- Main Sidebar Container -->
		<LayoutSidebar />
		<!-- Content Wrapper. Contains page content -->
		<div class="content-wrapper">
			<Nuxt/>
		</div>

		<!-- Main Footer -->
		<!-- <LayoutFooter /> -->
		<!--<LayoutFooter />-->
	</div>
</template>

<script>
	export default {
		head() {
			return {
				bodyAttrs: {
					class: "hold-transition layout-fixed layout-navbar-fixed",
				},
			};
		},
	};
</script>