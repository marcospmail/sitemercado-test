import React, {
  useState,
  ChangeEvent,
  useCallback,
  useMemo,
  useEffect,
} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { FiEdit2 } from 'react-icons/fi'
import NumberFormat from 'react-number-format'
import * as Yup from 'yup'
import { toast } from 'react-toastify'

import Button from '../../components/Button'
import Header from '../../components/Header'

import api from '../../config/api'

import ProductProps from '../../types/product'

import { Container, Content, Data, AvatarInput } from './styles'

interface ParamTypes {
  id?: string
}

interface ImageProps {
  imagePreview?: string
  file?: File
}

const Product: React.FC = () => {
  const [product, setProduct] = useState<ProductProps>({
    name: '',
    price: 0,
  })
  const { goBack } = useHistory()
  const [image, setImage] = useState<ImageProps>({
    imagePreview: undefined,
    file: undefined,
  })
  const { id } = useParams<ParamTypes>()

  const editing = useMemo(() => id, [])

  useEffect(() => {
    async function fetchProduct() {
      const response = await api.get(`/products/${id}`)
      setProduct(response.data)

      setImage(oldData => ({ ...oldData, imagePreview: response.data.path }))
    }

    fetchProduct()
  }, [])

  const handleImageChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(oldData => ({
        ...oldData,
        imagePreview: URL.createObjectURL(file),
        file,
      }))
    }
  }, [])

  const handleDataChange = useCallback(
    (name: string, value: string | number) => {
      console.log(name, value)

      setProduct(oldData => ({ ...oldData, [name]: value }))
    },
    []
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        price: Yup.number().required('Preço obrigatório'),
      })

      await schema.validate(product, {
        abortEarly: false,
      })

      const data = new FormData()
      data.append('name', product.name)
      data.append('price', String(product.price))

      if (image.file) data.append('image', image.file)

      console.log(data)

      const response = await api.post('/products', data)

      if (response.status !== 201) {
        throw new Error(response.data.message)
      }

      toast.success('Produto salvo!')
      goBack()
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
  }

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
                image.imagePreview ||
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
            value={product.name}
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
            value={product.price}
            onValueChange={values => {
              handleDataChange('price', values.floatValue ?? 0)
            }}
          />
        </Data>
      </Content>
    </Container>
  )
}

export default Product
