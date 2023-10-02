import axios from 'axios'
import Cookies from 'js-cookie'
import { storageKeys } from './storage'

const api = (() => {
  let axiosInstance = null

  const createAxiosInstance = ({
    baseUrl = '/', headers,
  }) => {
    let lastRequestUrl = ''

    axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        ...headers,
      },
    })

    axiosInstance.interceptors.request.use((config) => {
      lastRequestUrl = config.url
      const requestConfig = config
      const memberId = Cookies.get(storageKeys?.member_id)
      const accessToken = Cookies.get(storageKeys?.access_token)

      if (memberId && accessToken) {
        requestConfig.headers.Authorization = `Bearer ${accessToken}`
      }
      return requestConfig
    })

    axiosInstance.interceptors.response.use((response) => response, async (error) => Promise.reject(error))
  }

  return {
    createAxiosInstance,
    axiosInstance: () => axiosInstance,
  }
})()

export default api
