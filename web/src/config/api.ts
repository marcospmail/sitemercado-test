import axios from 'axios'

const api = axios.create({
   baseURL: 'https://dev.sitemercado.com.br/api/'
})

export default api