import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { FiArrowRight, FiTrash } from 'react-icons/fi'

import Button from '../../components/Button'
import Header from '../../components/Header'

import api from '../../config/api'

import ProductProps from '../../types/product'

import { Container, Content, EmptyData } from './styles'
import { toast } from 'react-toastify'

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

  const handleDelete = useCallback(
    async id => {
      try {
        const response = await api.delete(`/products/${id}`)

        if (response.status === 200) {
          toast.success('Produto deletado')

          const newProducts = products.filter(p => p.id !== id)
          setProducts(newProducts)

          return
        }

        throw new Error()
      } catch (err) {
        toast.error('Falha ao deletar produto')
      }
    },
    [products]
  )

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

        {products.length ? (
          <ul>
            {products.map(p => (
              <li key={p.id} onClick={() => history.push(`/product/${p.id}`)}>
                <span>{p.name}</span>

                <button
                  onClick={e => {
                    e.stopPropagation()
                    handleDelete(p.id)
                  }}
                >
                  <FiTrash size={14} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyData>
            <span>Nada cadastrado</span>
          </EmptyData>
        )}
      </Content>
    </Container>
  )
}

export default Products
