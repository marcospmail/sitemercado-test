import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import api from '../../config/api'
import apiAuth from '../../config/api_auth'

import { Container } from './styles'

interface FormData {
  username: string
  password: string
}

const Login: React.FC = () => {
  const history = useHistory()
  const [data, setData] = useState<FormData>({} as FormData)

  const handleFormSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const response = await api.post('/login',
        data, {
        auth: {
          username: apiAuth.username,
          password: apiAuth.password
        }
      })

      const responseData = response.data

      if (responseData.success) {
        history.push('/products')
        return
      }

      throw new Error(responseData.error)
    }
    catch (err) {
      //TODO 
      alert(err)
    }

  }, [])

  const handleUserChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setData(oldData => ({ ...oldData, username: value }))
  }, [])

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setData(oldData => ({ ...oldData, password: value }))
  }, [])

  return (
    <Container >

      <form onSubmit={handleFormSubmit}>

        <span>Site Mercado</span>

        <input name="username" placeholder="Usuário" onChange={handleUserChange} />
        <input name="password" placeholder="Senha" onChange={handlePasswordChange} />

        <button type="submit">Entrar</button>

      </form>

    </Container>
  )
}

export default Login