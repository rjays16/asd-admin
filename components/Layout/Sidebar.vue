<template>
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <span class="brand-link text-center p-2">
            <span class="brand-text font-weight-light">
                <img :src="sidebarLogo" alt="Admin Logo">
            </span>
        </span>
        <div class="sidebar pt-2 dmsans-bold">
            <div class="sidebar-container">
                <el-menu
                    class="el-menu-sidebar"
                    unique-opened
                    router
                    background-color="#B5B5B5"
                    text-color="#5E6570"
                    active-text-color="#FFE600"
                    ref="menuSidebar">
                    <el-menu-item index="/dashboard" @click="closeSubmenu">
                        <div class="container-icon">
                            <i class="fas fa-table"></i>
                        </div>
                        <span>Dashboard</span>
                    </el-menu-item>
                    <el-menu-item index="/delegates" @click="closeSubmenu">
                        <div class="container-icon">
                            <i class="fas fa-user"></i>
                        </div>
                        <span>Delegates</span>
                    </el-menu-item>
                    <el-menu-item index="/speakers" @click="closeSubmenu">
                        <div class="container-icon">
                            <i class="fas fa-user-md"></i>
                        </div>
                        <span>Speakers</span>
                    </el-menu-item>
                    <el-submenu index="/abstract" @click="closeSubmenu">
                      <template slot="title">
                        <div class="container-icon">
                          <i class="fas fa-file-invoice"></i>
                        </div>
                        <span>Abstract</span>
                      </template>
                      <el-menu-item index="/abstract/EPoster" class="adjust">
                        <span>E-Poster</span>
                      </el-menu-item>
                      <el-menu-item index="/abstract/FreePapers" class="adjust">
                        <span>Free Papers</span>
                      </el-menu-item>
                    </el-submenu>
                    <el-menu-item index="/fees" @click="closeSubmenu">
                        <div class="container-icon">
                            <i class="fas fa-file-invoice"></i>
                        </div>
                        <span>Fees</span>
                    </el-menu-item>
                    <el-menu-item index="/payments" @click="closeSubmenu">
                        <div class="container-icon">
                            <i class="fas fa-receipt"></i>
                        </div>
                        <span>Payment List</span>
                    </el-menu-item>
                    <el-submenu index="site-settings" ref="site-settings" @click="closeSubmenu">
                        <template slot="title">
                            <div class="container-icon">
                                <i class="fas fa-tools"></i>
                            </div>
                            <span>Site Settings</span>
                        </template>
                        <el-menu-item index="/site-settings/registration">
                            <i class="fas fa-circle"></i>
                            <span>Registration Switch</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </div>
    </aside>
</template>

<script>
export default {
	data() {
		return {
            searchTerm: null,
			sidebarLogo: require('~/static/img/logo-yellow.png'),
            submenus: ["members", "site-settings"],

            super_admin_type: this.$store.state.auth.super_admin_type,
            admin_type: this.$store.state.auth.admin_type,
		}
	},
    methods: {
        closeSubmenu() {
            let self = this
            this.submenus.forEach(function(submenu) {
                self.$refs.menuSidebar.close(submenu)
            });
        },
    },
    mounted() {
        $('.el-submenu__title').on('click', function(e) {
            $('.el-menu-item').not('.sub-item.is-active').removeClass('active')
        });
    }
}
</script>

<style lang="scss" scoped>
.main-sidebar {
    background: #B5B5B5!important;
    .sidebar {
        overflow-y: scroll;
        margin-top: calc(3.5rem + 62px)!important;
    }
    .brand-link {
        background: #B5B5B5!important;
        border-bottom: none;
        span {
            img {
                width: 150px;
            }
        }
    }
    .sidebar-container {
        .el-menu-sidebar {
            border: none;
            font-size: 2rem;
            i {
                &.fa, &.fas, &.far {
                    color: #5E6570;
                    margin-right: 0.5rem;
                    width: 15px;
                }
            }
            .container-icon {
                display: inline-block;
                margin-right: 0.5rem;
            }
            .el-menu-item {
                border-radius: 0px;
                &.is-active {
                    *, * > * {
                        color:#FFE600;
                    }
                }
                &.active {
                    border-radius: 0px;
                    .container-icon {
                        border-radius: 50%;
                        padding: 7px;
                        height: 30px;
                        width: 30px;
                        margin-left: -8px;
                        margin-right: 9px;
                        text-align: center;
                    }
                    i {
                        margin: 0 auto;
                        left: 19px;
                        position: absolute;
                        &.fa, &.fas, &.far {
                            color: #FFE600;
                        }
                    }
                }
            }
            .el-submenu {
                &.is-opened {
                    ::v-deep .el-submenu__title {
                        border-radius: 0px;
                        .container-icon {
                            padding: 7px;
                            height: 30px;
                            width: 30px;
                            margin-left: -8px;
                            margin-right: 9px;
                            text-align: center;
                        }
                        i:not(.el-icon-arrow-down) {
                            margin: 0 auto;
                            left: 19px;
                            position: absolute;
                        }
                    }
                }
                .el-menu-item {
                    padding-left: 15px!important;
                    font-size: 14px;
                    &.active {
                        i {
                            margin-right: 0.5rem;
                            position: initial;
                        }
                    }
                }
            }
            .multi-menu {
                ::v-deep {
                    .el-menu-item-group__title {
                        color: #EB7E10;
                        font-size: 13px;
                        > * {
                            color: #EB7E10;
                        }
                    }
                    .far, .fas {
                        margin-right: 0.5rem;
                    }
                }
            }
        }
    }
}
.adjust {
  margin-left: 20%;
}
</style>
