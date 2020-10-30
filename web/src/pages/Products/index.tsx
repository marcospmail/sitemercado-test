import React from 'react'
import { useHistory } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

import Button from '../../components/Button'
import Header from '../../components/Header'

import { Container, Content } from './styles'

const Products: React.FC = () => {
  const history = useHistory()

  return (
    <Container>
      <Header />

      <Content>
        <header>
          <strong>Produtos</strong>

          <Button primary onClick={() => history.push('/product')}>
            Novo
          </Button>
        </header>

        <ul>
          {[...Array(10).keys()].map(i => (
            <li key={i}>
              <span>Product {i}</span>
              <button onClick={() => history.push(`/product/${i}`)}>
                <FiArrowRight size={14} color="#666" />
              </button>
            </li>
          ))}
        </ul>
      </Content>
    </Container>
  )
}

export default Products
