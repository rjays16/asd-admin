<template>
	<section id="login">
		<div class="container-fluid h-100">
			<div class="row justify-content-center h-100">
				<div class="col-lg-4 col-md-6 col-sm-8 bg-00367E text-white">
					<div class="d-table">
						<div class="d-table-cell align-middle py-5 px-4">
							<div class="text-center my-4">
								<img src="/img/logo-yellow.png" class="logo">
							</div>
							<div class="mb-3">
								<label class="dmsans-bold">Email Address</label>
								<el-input @keyup.enter="recheckInputs" v-model="$v.form.email.$model" placeholder="Email" />
							</div>
							<div class="mb-3">
								<label class="dmsans-bold">Password</label>
								<el-input @keyup.enter="recheckInputs" v-model="$v.form.password.$model" placeholder="Password" show-password />
							</div>
							<div class="mb-4">
								<a href="#" tabindex="-1" class="dmsans-regular text-white" data-toggle="modal" data-target="#password-request-reset">
									Forgot Password?
								</a>
							</div>
							<div>
								<button @click="recheckInputs()" class="btn btn-yellow btn-block corner-rounded link-label dmsans-bold py-3 h5">
									Login
								</button>
							</div>
						</div>
					</div>
				</div>
				<div class="col-8 d-none d-lg-block background">
				</div>
			</div>
		</div>
		
		<ModalPasswordRequestReset />
	</section>
</template>

<script>
import { required } from 'vuelidate/lib/validators/';
export default {
	middleware: "isAuth",
  	layout: "login",
	head() {
		return {
			title: 'Login - Admin',
		}
	},
    data() {
        return {
			form: {
				email: null,
				password: null,
			}
		}
	},
	validations: {
		form: {
			email: {
				required,
			},
			password: {
				required,
			},
		}
    },
	created() {
        this.$v.$reset;
    },
	methods: {
        recheckInputs() {
            this.$v.$touch();
            if(this.$v.$error) {
                this.$message.error('Please fill in required fields.');
			} else {
                this.login();
            }
        },
        login() { 
			this.$store.dispatch("auth/login", this.form)
            .then((res) => {
                this.$router.push("/dashboard");
            })
            .catch((err) => {
				this.$message.error(err.response.data.message);
            });
        },
    }
}
</script>

<style lang="scss" scoped>
#login {
	height: 100vh;
	.logo {
		width: 75%;
	}
	.background {
		background: url('~/static/img/banner-mobile.png') no-repeat;
		background-size: cover;
	}
}
</style>