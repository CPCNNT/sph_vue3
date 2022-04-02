import { functions } from 'lodash'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reqVerificationCode, reqRegister } from '../api/api.js'

export const useUserStore = defineStore(
  'user',
  () => {
    const vCode = ref('')

    async function getVerificationCode(phone) {
      const res = await reqVerificationCode(phone)
      if (res.code === 200) {
        vCode.value = res.data
        return res.message
      } else {
        return Promise.reject(res.message)
      }
    }
    async function userRegister(userInfo) {
      const res = await reqRegister(userInfo)
      // console.log(res)
      if (res.code === 200) {
        return res.message
      } else {
        return Promise.reject(res.message)
      }
    }

    return {
      vCode,
      getVerificationCode, userRegister
    }
  }
)
