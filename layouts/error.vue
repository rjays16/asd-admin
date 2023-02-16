<template>
	<div class="wrapper">
		<div class="login-box">
			<div class="card">
				<article class="card-body text-center">
                    <h1 class="text-uppercase w-100">
						{{ error.statusCode === 404 ? "Page not found" : "An error occurred" }}
					</h1>
                    <a href="/">Return to Home page</a>
				</article>
			</div>
		</div>
	</div>
</template>

<script>
    export default {
		props: ["error"],
        layout: 'login'
    }
</script>

<style lang="scss" scoped>
	.wrapper {
		height: 100vh;
	}
	.login-box {
		display: flex;
		align-items: center;
		flex-direction: column; 
		justify-content: center;
		width: 100%;
		min-height: 100%;
		padding: 20px;
	}
</style>