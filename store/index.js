export const state = () => ({
    navbarTitle: "Admin",
    navbarSubpageTitle: "",
    navbarIcon: "",
    simpleDashView: true,
})


export const mutations = {
    SET_NAVBAR_TITLE(state, data) {
        state.navbarTitle = data;
    },
    SET_NAVBAR_SUBPAGE_TITLE(state, data) {
        state.navbarSubpageTitle = data;
    },    
    SET_NAVBAR_ICON(state, data) {
        state.navbarIcon = data;
    },
    SET_DASH_VIEW(state, data) {
        if (data === 1) {
            state.simpleDashView = true
        } else {
            state.simpleDashView = false
        }
    }
}