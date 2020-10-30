import axios from 'axios'

const siteMercadoApi = axios.create({
  baseURL: 'https://dev.sitemercado.com.br/api/',
})

export default siteMercadoApi
