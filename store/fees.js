export const state = () => ({
    fees: [],

    scopes: [
        { id: 1, value: false, name: "Local (PHP)" },
        { id: 2, value: true, name: "International (USD)" }
    ],

    types: [
        { id: 1, value: 1, name: "Registration" },
        { id: 2, value: 2, name: "Workshop" }
    ],
});

export const getters = {
    getFees: (state) => {
        return state.fees;
    },
};

export const mutations = {
    SET_FEES(state, data) {
        state.fees = data;
    },
};

export const actions = {
    getFees({ commit }, data) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/fees', data)
            .then(res => {
                resolve(res)
                commit('SET_FEES', res.data);
            })
            .catch(err => {
                reject(err.response.data.message)
                commit('SET_FEES', []);
            })
        })
    },
    getFee({}, id) {
        return new Promise((resolve, reject) => {
            this.$axios.get(`/fees/${id}`)
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
            this.$axios.post('/fees', data)
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
            this.$axios.post(`/fees/${data['id']}`, data)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err.response.data.message)
            })
        })
    },
};