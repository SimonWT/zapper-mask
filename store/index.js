export const state = () => ({
    user: {
     username: null,
     role: 'default'
    },
    loggedIn: false
  })

  
export const  getters = {
    user(state) {
      return state.user
    },
    isLoggedIn(state) {
        return state.loggedIn
    }
}

export const mutations = {
    SET_LOGGED_IN(state, value) {
      state.loggedIn = value
    },
    SET_USER(state, payload) {
      state.user = payload
    }
}
export const actions = {
    async nuxtServerInit({ dispatch }, { req }) {
      const username = this.$cookiz.get('USERNAME')
      const role = this.$cookiz.get('ROLE') ?? 'admin'
      if (username) {
        await dispatch('setUser',  { username, role })
      }
    },
    setUser({ commit }, userInfo) {
      //Зафетчить тариф, название компании
      commit('SET_USER', {
        ...userInfo
      })
      this.$cookiz.set('USERNAME', userInfo.username)
      this.$cookiz.set('ROLE', userInfo.role)
      commit('SET_LOGGED_IN', true)
    },

    async logout({ commit, dispatch }) {
      console.log('[STORE ACTIONS] - logout')
      this.$cookiz.removeAll()
      commit('SET_LOGGED_IN', false)
    }
  }