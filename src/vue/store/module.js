/**
 * state
 */
const state = {
  key: true
}

/**
 * getters
 */
const getters = {}

/**
 * mutations
 */
const mutations = {
  MUTATION (state) {
    state.key = !state.key
  }
}

/**
 * actions
 */
const actions = {
  action ({ commit }) {
    commit('MUTATION')
  }
}

/**
 * export
 */
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
