export const state = () => ({
    users: [],
});

export const getters = {
    getUsers: (state) => {
        return state.users;
    },
};

export const mutations = {
    SET_USERS(state, data) {
        state.users = data;
    },
};

export const actions = {
    // Start of orders
    getOrders({}, member_id) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/orders/user', {
                params: {
                    member_id: member_id
                }
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    // End of orders

    // Start of resending Emails
    resendThankYouEmail({}, user_id) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/users/${user_id}/resendThankYouEmail`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    resendPaymentEmail({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post(`/users/${data["user_id"]}/resendPaymentEmail`, data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    // End of resending Emails

    // Start of payments
    getPayments({}, user_id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/payments/${user_id}`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    approvePayment({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/orders/user/update', data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    // End of payments
};