import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import product from '../models/Product'
import productView from '../views/products_views'

export default {
  async index(req: Request, res: Response) {
    const productsRepository = getRepository(product)

    const productsFound = await productsRepository.find()    

    return res.json(productView.renderMany(productsFound))
  },

  async show(req: Request, res: Response) {
    const { id } = req.params

    const productsRepository = getRepository(product)

    const productFound = await productsRepository.findOne({ where: { id }})    

    return res.json(productView.render(productFound))
  },

  async create(req: Request, res: Response) {
    const {
      name,
      price
    } = req.body

    const data : { name: string, price: number, path?: string } = { name, price, path: undefined }

    if (req.file)
      data.path = req.file.filename

    const schemaValidation = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      path: Yup.string(),
    })

    await schemaValidation.validate(data, {
      abortEarly: false
    })

    const productsRepository = getRepository(product)

    const newProduct = productsRepository.create(data)

    await productsRepository.save(newProduct)

    return res.status(201).json(newProduct)
  },

  async update(req: Request, res: Response) {
    const { id } = req.params

    const {
      name,
      price
    } = req.body
    
    const data : { name: string, price: number, path: string | undefined } = { name, price, path: undefined }

    if (req.file)
      data.path = req.file.filename

    const schemaValidation = Yup.object().shape({
      name: Yup.string(),
      price: Yup.number(),
      path: Yup.string(),
    })

    await schemaValidation.validate(data, {
      abortEarly: false
    })

    const productsRepository = getRepository(product)

    const productFound = await productsRepository.findOne(id)

    if (!productFound) return res.status(400).json({message: 'Product not found'})

    if (name)
      productFound.name = name

    if (price)
      productFound.price = price

    if (req.file)
      productFound.path = req.file.filename


    const updatedProduct = await productsRepository.save(productFound)

    return res.status(201).json(updatedProduct)
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params

    const productsRepository = getRepository(product)

    const newProduct = productsRepository.delete(id)

    return res.status(200).json(newProduct)
  }
}