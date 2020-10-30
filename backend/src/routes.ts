import { Router } from 'express'
import multer from 'multer'

import ProductsController from './controllers/ProductsController'
import uploadConfig from './config/upload'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/products', ProductsController.index)
routes.get('/products/:id', ProductsController.show)
routes.post('/products',  upload.single('image'), ProductsController.create)
routes.delete('/products/:id',  ProductsController.delete)

export default routes