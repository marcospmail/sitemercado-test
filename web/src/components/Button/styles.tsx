import styled from 'styled-components'
import { darken } from 'polished'

interface ButtonProps {
  primary: boolean
}

export const Button = styled.button<ButtonProps>`
  border-radius: 4px;
  padding: 10px 15px;
  border: 1px solid #ddd;
  font-weight: bold;
  color: #fff;
  font-size: 20px;
  background: ${({ primary }) => (primary ? '#4167df' : '#ddd')};
  transition: background 0.2s;

  &:hover {
    background: ${({ primary }) => darken(0.1, primary ? '#4167df' : '#ddd')};
  }
`
