const commn = {
  state: {
    showLogin: false,
    hideReg: true,
    isLogin: false,
    immigrantList: [
      0, //country
      -1, //state
      0, //price
      0, //tar
      0, //type1
      0, //type2
      0, //hcount
      [0, 0, 0, 0, 0] //tag
    ]
  },
  mutations: {
    TOGGLE_DIALOG: (state, isShow) => {
      state.showLogin = isShow
    },

    TOGGLE_REG: (state, isHide) => {
      state.hideReg = isHide
    },

    TOGGLE_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin
    },

    TOGGLE_immigrantList: (state, data) => {
      state.immigrantList = data
    }

  },
  actions: {
    ToggleDialog({
      commit
    }, isShow) {
      commit('TOGGLE_DIALOG', isShow)
    },
    ToggleReg({
      commit
    }, isHide) {
      commit('TOGGLE_REG', isHide)
    },
    ToggleLogin({
      commit
    }, isLogin) {
      commit('TOGGLE_LOGIN', isLogin)
    },

    TOGGLE_immigrantList({
      commit
    }, data) {
      commit('TOGGLE_immigrantList', data)
    }

  }

}

export default commn
