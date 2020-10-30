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

    console.log(req.body)

    let path

    console.log(req.file)

    if (req.file)
      path = req.file.filename

    const newProduct = productsRepository.create({
      name, 
      price,
      path
    })

    await productsRepository.save(newProduct)

    return res.status(201).json(newProduct)
  }
}