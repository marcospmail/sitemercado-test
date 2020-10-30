import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

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

    const productsRepository = getRepository(product)

    let path

    if (req.file)
      path = req.file.filename

    const newProduct = productsRepository.create({
      name, 
      price,
      path
    })

    await productsRepository.save(newProduct)

    return res.status(201).json(newProduct)
  },

  async update(req: Request, res: Response) {
    console.log(req)

    const { id } = req.params

    const {
      name,
      price
    } = req.body

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