import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const apiURL = 'https://henrique-chat-api.herokuapp.com/'

const request = axios.create({
  baseURL: apiURL,
})

request.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token')

  config.headers.Authorization = `Bearer ${token}`

  return config
})

export { request as default, apiURL }
