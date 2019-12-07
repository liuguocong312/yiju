import { login, logout } from '@/api/user'
import { userInfo } from '@/api/userInfo'
import {
  getToken, setToken, removeToken,
  getUUID,setUUID,removeUUID
} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    uuid:getUUID()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_UUID: (state, uuid) => {
      state.uuid = uuid
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {

      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.body;
          setToken(data.token);
          commit('SET_TOKEN', data.token);
          commit('SET_NAME', data.nickName);
          commit('SET_AVATAR', data.avatarImg);
          setUUID(data.id);
          commit('SET_UUID', data.id);
          //设置
          console.log(response);
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        // commit('SET_NAME', "17606637573")
        // commit('SET_AVATAR', "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif")
        // resolve()
        userInfo().then(response => {
          const data = response.body;

          commit('SET_NAME', data.nickName);
          commit('SET_AVATAR', data.avatarImgUrl);

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      });
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_UUID', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        removeToken()
        removeUUID()
        resolve()
        // logout().then(() => {
        //   commit('SET_TOKEN', '')
        //
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) { 
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_UUID', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        removeToken()
        removeUUID()
        resolve()
      })
    }
  }
}

export default user
