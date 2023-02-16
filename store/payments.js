export const state = () => ({
    payments: [],
});

export const getters = {
    getPayments: (state) => {
        return state.payments;
    },
};

export const mutations = {
    SET_PAYMENTS(state, data) {
        state.payments = data;
    },
};

export const actions = {
    getPayments({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/payments', {
                params: {
                    is_search: data.is_search,
                    keyword: data.keyword,
                    show_all: data.show_all
                }
            })
            .then(res => {
                resolve(res)
                commit('SET_PAYMENTS', res.data);
            })
            .catch(err => {
                reject(err.response.data.message)
                commit('SET_PAYMENTS', []);
            })
        })
    },
    getPayment({}, id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/payments/${id}`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    export({}) {
        return new Promise((resolve, reject) =>{
            this.$axios.get('/payments/export', {
                responseType: 'blob'
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
};