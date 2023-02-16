export const state = () => ({
});

export const getters = {
};

export const mutations = {
};

export const actions = {
    getFee({}) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/settings/ideapay')
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
        })
    },
    update({}, data) {
        return new Promise((resolve, reject) => {
            this.$axios.post('/settings/ideapay', data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
};