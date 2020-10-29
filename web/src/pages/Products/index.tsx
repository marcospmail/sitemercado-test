import React from 'react';

import { Container, Content } from './styles';

const Products: React.FC = () => {
  return (
    <Container>
      <Content>
        <button>Novo</button>
        <ul>
          {[...Array(10).keys()].map(i => (
            <li key={i}>
              Product {i}
            </li>
          ))}

        </ul>
      </Content>
    </Container>
  )
}

export default Products;