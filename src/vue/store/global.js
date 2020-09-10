/**
 * state
 */
const state = {
  status: false
}

/**
 * getters
 */
const getters = {}

/**
 * mutations
 */
const mutations = {
  CHANGE (state, payload) {
    state.status = payload
  }
}

/**
 * actions
 */
const actions = {
  change ({ commit }, payload) {
    commit('CHANGE', payload)
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
