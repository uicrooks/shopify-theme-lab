/**
 * state
 */
const state = {
  visible: false
}

/**
 * getters
 */
const getters = {}

/**
 * mutations
 */
const mutations = {
  TOGGLE (state) {
    state.visible = !state.visible
  },

  SHOW (state) {
    state.visible = true
  },

  HIDE (state) {
    state.visible = false
  }
}

/**
 * actions
 */
const actions = {
  toggle ({ commit }) {
    commit('TOGGLE')
  },

  show ({ commit }) {
    commit('SHOW')
  },

  hide ({ commit }) {
    commit('HIDE')
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