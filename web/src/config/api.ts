import axios from 'axios'

const siteMercadoApi = axios.create({
  baseURL: 'http://localhost:3333/',
})

export default siteMercadoApi
