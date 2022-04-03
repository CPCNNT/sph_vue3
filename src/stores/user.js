import { functions } from 'lodash'
import { defineStore } from 'pinia'
import { computed, reactive, ref } from 'vue'
import { reqVerificationCode, reqRegister, reqLogin, reqUserInfo, reqLogout } from '../api/api.js'
import { setToken, getToken, removeToken } from "../utils/token.js"

export const useUserStore = defineStore(
  'user',
  () => {
    const vCode = ref('')
    const token = ref(getToken())
    const userInfo = reactive({})

    async function getVerificationCode(phone) {
      const res = await reqVerificationCode(phone)
      if (res.code === 200) {
        vCode.value = res.data
        return res.message
      } else {
        return Promise.reject(res.message)
      }
    }
    async function userRegister(registrationInfo) {
      const res = await reqRegister(registrationInfo)
      // console.log(res)
      if (res.code === 200) {
        return res.message
      } else {
        return Promise.reject(res.message)
      }
    }
    async function userLogin(loginInfo) {
      const res = await reqLogin(loginInfo)
      // console.log(res)
      if (res.code === 200) {
        token.value = res.data.token
        setToken(res.data.token)
        return res.message
      } else {
        return Promise.reject(res.message)
      }
    }
    async function getUserInfo() {
      if (token.value) {
        const res = await reqUserInfo()
        // console.log(res)
        if (res.code === 200) {
          Object.assign(userInfo, res.data)
          return res.message
        } else {
          return Promise.reject(res.message)
        }
      }
    }
    async function userLogout() {
      const res = await reqLogout()
      if (res.code === 200) {
        token.value = ''
        Object.keys(userInfo).forEach(key => {
          delete userInfo[key]
        })
        removeToken()
        return res.message
      } else {
        return Promise.reject(res.message)
      }
    }

    const userName = computed(() => userInfo?.name ?? '')

    return {
      vCode, token, userInfo,
      getVerificationCode, userRegister, userLogin, getUserInfo, userLogout,
      userName
    }
  }
)
