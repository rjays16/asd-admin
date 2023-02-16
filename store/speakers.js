export const state = () => ({
    speakers: [],
    
    types: [
        // { id: 1, name: "Speaker" },
    ],

    sub_types: [
        // { id: 1, name: "Speaker Sub Type" },
    ],
});

export const getters = {
    getSpeakers: (state) => {
        return state.speakers;
    },
};

export const mutations = {
    SET_SPEAKERS(state, data) {
        state.speakers = data;
    },
};

export const actions = {
    // Start of CRUD
    getSpeakers({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/speakers', {
				params: {
                    is_search: data.is_search,
					keyword: data.keyword,
                    show_all: data.show_all
				}
			})
            .then(res => {
                resolve(res)
                commit('SET_SPEAKERS', res.data);
            })
            .catch(err => {
                reject(err.response.data.message)
                commit('SET_SPEAKERS', []);
            })
        })
    },
    getSpeaker({}, id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/speakers/${id}/profile`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    create({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/speakers', data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    update({}, data) {
        return new Promise((resolve, reject) => {
            console.log(data)
            this.$axios.post(`/speakers/${data['speaker_id']}/profile`, data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    delete({}, id){
        return new Promise((resolve, reject) =>{
            this.$axios.delete(`/speakers/${id}/profile`)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
    // End of CRUD
    
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
            this.$axios.post(`/members/${user_id}/resendThankYouEmail`)
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
            this.$axios.post(`/members/${data["user_id"]}/resendPaymentEmail`, data)
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

    // Start of import/export Files
    import({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/speakers/import', data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    exportTemplate({}) {
        return new Promise((resolve, reject) =>{
            this.$axios.get('/speakers/export/template', {
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
    // End of import/export Files
};