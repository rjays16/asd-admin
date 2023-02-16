export const state = () => ({
    yesNoOptions: [
        { id: 1, value: true, name: "Yes" },
        { id: 2, value: false, name: "No" }
    ],

    availableDateOptions: {
        disabledDate (date) {
            var yesterday = new Date();
            yesterday.setDate(yesterday.getDate()-1);
            return date < yesterday
        }
    },

    countries: [],
});

export const getters = {
    getCountries: (state) => {
        return state.countries;
    },
};

export const mutations = {
    SET_COUNTRIES(state, data) {
        state.countries = data;
    },
};

export const actions = {
    getCountries({ commit }) {
        return new Promise((resolve, reject) => {
            this.$axios.get('/countries')
            .then(res => {
                resolve(res)
                commit('SET_COUNTRIES', res.data);
            })
            .catch(err => {
                console.log(err)
                reject(err)
                commit('SET_COUNTRIES', []);
            })
        })
    },
};