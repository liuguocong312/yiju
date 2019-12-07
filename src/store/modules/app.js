import Cookies from 'js-cookie'

const app = {
  state: {
    device: 'desktop',
    queryList: [
      0, //country
      -1, //state
      0, //price
      0, //tar
      0, //type1
      0, //type2
      0, //hcount
      [0, 0, 0, 0, 0] //tag
    ],
    cityIndex:-1
  },
  mutations: {

    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },

    TOGGLE_queryList: (state, data) => {
      state.queryList = data
      state.queryList[1] = state.cityIndex
    },
    TOGGLE_cityIndex: (state, index) => {
      state.cityIndex = index
    }
  },
  actions: {

    ToggleDevice({ commit }, device) {
      commit('TOGGLE_DEVICE', device)
    },

    TOGGLE_queryList({ commit }, data) {
      commit('TOGGLE_queryList', data)
    },
  
    TOGGLE_cityIndex({ commit }, index) {
      commit('TOGGLE_cityIndex', index)
    }
  }
}

export default app
