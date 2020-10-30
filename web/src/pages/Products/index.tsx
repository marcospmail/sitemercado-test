import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

import Button from '../../components/Button'
import Header from '../../components/Header'

import api from '../../config/api'

import ProductProps from '../../types/product'

import { Container, Content } from './styles'

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([])
  const history = useHistory()

  useEffect(() => {
    async function fetchProducts() {
      const response = await api.get('/products')
      setProducts(response.data)
    }

    fetchProducts()
  }, [])

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
          {products.map(p => (
            <li key={p.id}>
              <span>{p.name}</span>
              <button onClick={() => history.push(`/product/${p.id}`)}>
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
