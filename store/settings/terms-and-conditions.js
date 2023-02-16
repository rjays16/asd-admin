export const actions = {
    getTerms({}) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/settings/terms-and-conditions')
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
            this.$axios.post('/settings/terms-and-conditions', data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
};