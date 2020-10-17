import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    antRouter:[],
    token: getToken(),
    name: '',
    avatar: '',
    userInfo:'',
  }
}

const state = getDefaultState()

const mutations = {
  SET_ROUTER: (state,data)=>{
    state.antRouter = data
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },  
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: username.trim(), password: password }).then(response => {
        debugger
        // console.log( process.env.VUE_APP_BASE_API)
        window.location.href = window.location.href +'personalCenter/editpassword'
        // this.$router.push({ path: '/salaryManagement/userList' })
        const { data } = response;
        
        commit('SET_TOKEN', data.tokenKey)
        setToken(data.tokenKey)
        sessionStorage.setItem("userName",data.userName);
        sessionStorage.setItem("allowCollectFlag",data.allowCollectFlag);
        commit('SET_USERINFO', data)
        resolve()
       
      }).catch(error => {
        reject(error)
      })
      const { data } = response
      // commit('SET_TOKEN', 'asdasda')
      // setToken('asdasda')
      // resolve()
      // login({ username: username.trim(), password: password }).then(response => {
      //   const { data } = response
      //   commit('SET_TOKEN', data.token)
      //   setToken(data.token)
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

