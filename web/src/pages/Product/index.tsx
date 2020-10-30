import React, { useState, ChangeEvent, useCallback, useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { FiEdit2 } from 'react-icons/fi'
import NumberFormat from 'react-number-format'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import Button from '../../components/Button'
import Header from '../../components/Header'

import siteMercadoApi from '../../config/siteMercadoApi'
import { Container, Content, Data, AvatarInput } from './styles'

interface ParamTypes {
  id?: string
}

interface FormData {
  name: string
  price: number
  imagePreview?: string
  file?: File
}

const Product: React.FC = () => {
  const { goBack } = useHistory()
  const [formData, setFormData] = useState<FormData>({} as FormData)
  const { id } = useParams<ParamTypes>()

  const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFormData(oldFormData => ({
        ...oldFormData,
        imagePreview: URL.createObjectURL(file),
      }))
    }
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        console.log(formData)

        const schema = Yup.object().shape({
          name: Yup.string()
            .min(5, 'Nome deve ter mais que 5 caractéres')
            .required('Nome obrigatório'),
          price: Yup.number()
            .positive('Valor não pode ser negativo')
            .required('Preço obrigatório'),
        })

        await schema.validate(formData, {
          abortEarly: false,
        })

        const data = new FormData()
        data.append('name', formData.name)
        data.append('price', String(formData.price))

        if (formData.file) data.append('image', formData.file)

        const response = await siteMercadoApi.patch('/products', data)
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const yupErrors = err as Yup.ValidationError

          yupErrors.inner.forEach(error => {
            toast.error(error.message)
          })

          return
        }

        toast.error('Falha ao salvar produto')
      }
    },
    []
  )

  const editing = useMemo(() => id, [])

  const handleDataChange = useCallback(
    (name: string, value: string | number) => {
      setFormData(oldData => ({ ...oldData, [name]: value }))
    },
    []
  )

  return (
    <Container>
      <Header />

      <Content>
        <header>
          <strong>{editing ? 'Editando produto' : 'Inserindo produto'}</strong>

          <div>
            <Button type="button" onClick={goBack}>
              Cancelar
            </Button>
            <Button primary type="submit" form="form">
              Salvar
            </Button>
          </div>
        </header>

        <Data id="form" onSubmit={handleSubmit}>
          <AvatarInput>
            <img
              src={
                formData.imagePreview ||
                'https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg'
              }
              alt="Imagem produto"
            />
            <label htmlFor="avatar">
              <FiEdit2 />
              <input type="file" id="avatar" onChange={handleImageChange} />
            </label>
          </AvatarInput>

          <label>NOME PRODUTO</label>
          <input
            name="name"
            value={formData.name}
            onChange={e => {
              const { name, value } = e.target
              handleDataChange(name, value)
            }}
          />

          <label>PREÇO</label>
          <NumberFormat
            thousandSeparator="."
            isNumericString
            decimalSeparator=","
            fixedDecimalScale
            decimalScale={2}
            prefix="R$"
            value={formData.price}
            onValueChange={values => {
              handleDataChange('price', values.floatValue || 0)
            }}
          />
        </Data>
      </Content>
    </Container>
  )
}

export default Product
