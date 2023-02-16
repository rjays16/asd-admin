export const state = () => ({
  abstracts: [],
});

export const getters = {
  getAbstract: (state) => {
    return state.abstracts
  },
};

export const mutation = {
  SET_ABSTRACTS(state, data) {
   state.abstracts = data
  }
}

export const actions = {
  getAllEposterAbstracts({}, id){
    return new Promise((resolve, reject) => {
      this.$axios.get('/abstracts/e-poster')
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
  getAllFreePaperAbstracts({}, id){
    return new Promise((resolve, reject) => {
      this.$axios.get('/abstracts/free-papers')
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
  getAbstract({}, id){
    return new Promise((resolve, reject) => {
      this.$axios.get(`/abstracts/${id}`)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
  delete({}, id){
    return new Promise((resolve, reject) => {
      this.$axios.delete(`/abstracts/${id}`)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err.response.data.message)
        })
    })
  },
}
