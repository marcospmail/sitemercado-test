import React, { ButtonHTMLAttributes } from 'react'

import { Button as MyButton } from './styles'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean
}

const Button: React.FC<ButtonProps> = ({
  children,
  primary = false,
  ...rest
}) => {
  return (
    <MyButton primary={primary} {...rest}>
      {children}
    </MyButton>
  )
}

export default Button
