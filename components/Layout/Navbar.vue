<template>
    <nav class="main-header navbar navbar-expand nav-light">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link sidebar-toggle" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>
            <li class="nav-item d-sm-inline-block">
                <div class="nav-link page-name">
                    <span class="page-icon mr-1" v-if="navbarIcon" v-html="navbarIcon"></span>
                    <span class="page-title dmsans-bold">{{ navbarTitle }}</span>
                    <span class="subpage-title" v-if="navbarSubpageTitle">- {{ navbarSubpageTitle }}</span>                
                </div>
            </li>
        </ul>
        <ul class="navbar-nav ml-auto right-nav">
            <li class="nav-item ml-2 pt-1">
                <el-dropdown trigger="click">
                    <span class="btn nav-username">
                        Hello, <span class="user-name">{{ fullname }}</span>
                        <i class="fa fa-angle-down"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" class="user-options">
                        <!-- <el-dropdown-item>
                            <p class="mb-0" @click="$router.push('/profile/password')">
                                <i class="fa fa-user"></i>
                                Change Password
                            </p>
                        </el-dropdown-item>
                        <div class="dropdown-divider"></div> -->
                        <el-dropdown-item>
                            <p class="mb-0" @click="logout">
                                <i class="fa fa-lock"></i>
                                Sign Out
                            </p>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>                
            </li>
        </ul>
    </nav>  
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex"
    export default {
        data() {
            return {
                user: this.$store.state.auth.user,

                notifications: []
            }
        },
        computed: {
            ...mapState(['navbarTitle', 'navbarIcon', 'navbarSubpageTitle', 'simpleDashView']),
            ...mapGetters({
                fullname: 'auth/userFullname',
            }),
        },
        methods: {
            ...mapActions({
                vxLogout: "auth/logout",
            }),
            setDashView(value) {
                this.$store.commit('SET_DASH_VIEW', value)
            },
            logout() {
                this.vxLogout()
                .then((res) => {
                    this.$router.push("/");
                    // console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    this.$router.push("/");
                });
            },
        },
    }
</script>

<style lang="scss" scoped>
.sidebar-toggle {
    border-radius: 5px;
    color: #486e81!important;
}
.page-name {
    padding-top: 5px;
    .page-icon {
        color: #1f96d2;
    }
    .page-title {
        color: black;
        font-weight: 700;
        font-size: 1.3rem;
    }
    .subpage-title {
        color: #848484;
        font-weight: 700;
    }
}
.right-nav {
    .border-right {
        padding-right: 25px;
    }
    .user-name {
        font-weight: 700;
    }
    .notice-num {
        ::v-deep .el-badge__content {
            padding: 0 6px!important;
        }
    }
    .notice-icon {
        background: #a8e2ff;
        color: #0088cc;
    }
}
.nav-username {
    padding: 0px 7px 4px;
    vertical-align: bottom;
}

@media only screen and (max-width: 768px) {
    .page-name {
        padding-top: 0px;
        span {
            font-size: 12px;
        }
    }
    .nav-username {
        display: none;
    }
}  
</style>