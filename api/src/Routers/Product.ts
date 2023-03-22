import express from 'express'
const route = express.Router()
import { Product } from '../Controllers'
import { Authorization } from '../Middlewares'
const {
	AUTgetRandomProduct,
	createProduct,
	deleteProduct,
	getAllProducts,
	getSingleProduct,
} = Product
route.get('/', getAllProducts)
route.get('/:id', getSingleProduct)
route.post('/', Authorization, createProduct)
route.delete('/:id', Authorization, deleteProduct)
export { route as ProductRouter }
