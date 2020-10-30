import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import Button from '../../components/Button'

import Header from '../../components/Header'
import siteMercadoApi from '../../config/siteMercadoApi'
import { useAuth } from '../../hooks/auth'

import { Container, Content } from './styles'

interface FormData {
  username: string
  password: string
}

const Login: React.FC = () => {
  const { signIn } = useAuth()

  const history = useHistory()
  const [data, setData] = useState<FormData>({} as FormData)

  const handleFormSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        const schema = Yup.object().shape({
          username: Yup.string().required('Usuário obrigatório'),
          password: Yup.string().required('Senha obrigatória'),
        })

        await schema.validate(data, {
          abortEarly: false,
        })

        const response = await siteMercadoApi.post('/login', data, {
          auth: {
            username: `${process.env.REACT_APP_API_USERNAME}`,
            password: `${process.env.REACT_APP_API_PASSWORD}`,
          },
        })

        const responseData = response.data

        if (responseData.success) {
          signIn(data)
          return
        }

        toast.error(responseData.error)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const yupErrors = err as Yup.ValidationError

          yupErrors.inner.forEach(error => {
            toast.error(error.message)
          })

          return
        }

        toast.error('Falha ao realizar login')
      }
    },
    [data, history]
  )

  const handleDataChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setData(oldData => ({ ...oldData, [name]: value }))
    },
    []
  )

  return (
    <Container>
      <Header />

      <Content>
        <form onSubmit={handleFormSubmit}>
          <input
            name="username"
            placeholder="Usuário"
            onChange={handleDataChange}
          />
          <input
            name="password"
            placeholder="Senha"
            onChange={handleDataChange}
          />

          <Button type="submit" primary>
            Entrar
          </Button>
        </form>
      </Content>
    </Container>
  )
}

export default Login
