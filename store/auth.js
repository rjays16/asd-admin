import cookies from '~/node_modules/js-cookie';

export const state = () => ({
    token: null,
    role_id: null,
    user: {
        data: {
            id: 1,
            full_name: "",
            first_name: "",
            last_name: "",
            phone: "",
            email: "",
            street: "",
            city: "",
            state: "",
            zipCode: "",
            profile_photo: require('~/static/img/blank.png'),
          admin_capability: {
            delegates: false,
            abstracts: false,
            can_delete_abstract: false,
            can_resend_abstract_ty_mail: false,
            vip: false,
            can_update_members: false,
            fees: false,
            payments: false,
            orders: false,
            can_update_orders: false,
            site_settings: false,
          }
        }
    },

    super_admin_type: 1,
    admin_type: 2
});

export const getters = {
    isLoggedIn: (state) => {
        return !!state.token;
    },
    userFullname: (state) => {
        return state.user.full_name;
    },
    user: (state) => {
      return state.user;
    },
    adminCapability: (state) => {
      return state.user.admin_capability;
    },
}

export const mutations = {
    SET_TOKEN(state, token) {
        state.token = token;
    },
    REMOVE_TOKEN(state) {
        state.token = null;
    },
    SET_USER(state, data) {
        state.user = data;
    },
    SET_USER_ROLE(state, data) {
        state.user_role = data;
    }
}

export const actions = {
    setToken({ commit }, {token}) {
        this.$axios.setToken(token, 'Bearer');
        cookies.set('asd-admin-x-access-token', token, { expires: new Date(new Date().getTime() + 86400 * 1000) });
        commit('SET_TOKEN', token);
    },
    login({ dispatch }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/login', data)
            .then(res => {
                let token = res.data.token;
                dispatch('setToken', {token});
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    logout({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/logout')
            .then(res => {
                cookies.remove('asd-admin-x-access-token');
                commit('REMOVE_TOKEN');
                this.$axios.setToken(false);
                resolve(res)
            })
            .catch(err => {
                cookies.remove('asd-admin-x-access-token');
                commit('REMOVE_TOKEN');
                this.$axios.setToken(false);
                reject(err)
            })
        })
    },
    async check({ commit }, { token }) {
        this.$axios.setToken(token, 'Bearer');
        const expiryTime = new Date(new Date().getTime() + 86400 * 1000);
        cookies.set('asd-admin-x-access-token', token, {expires: expiryTime});
        commit('SET_TOKEN', token);
        const res = await this.$axios.get('/user');
        // console.log(res.data)
        commit('SET_USER', res.data);
        commit('SET_USER_ROLE', res.data.role);
    },
    removeToken({commit}) {
        this.$axios.setToken(false);
        cookies.remove('asd-admin-x-access-token');
        commit('REMOVE_TOKEN');
    },
    sendPasswordResetRequest({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/password/reset-request', data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    }
}
