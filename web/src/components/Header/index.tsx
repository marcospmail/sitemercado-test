import React from 'react'
import { useAuth } from '../../hooks/auth'

import { Container } from './styles'

const Header: React.FC = () => {
  const { user, logout } = useAuth()

  return (
    <Container>
      <strong>SiteMercado</strong>
      {!!user && <button onClick={logout}>Sair</button>}
    </Container>
  )
}

export default Header
