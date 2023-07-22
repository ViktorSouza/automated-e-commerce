import express from 'express'
const route = express.Router()
import { Product } from '../controllers'
import { Authorization } from '../middlewares'
const {
	updateProduct,
	AUTgetRandomProduct,
	createProduct,
	deleteProduct,
	getAllProducts,
	getSingleProduct,
	getOwnProducts,
} = Product
route.get('/', getAllProducts)
route.get('/AUTrandomProduct', AUTgetRandomProduct)
route.get('/own-products', Authorization({}), getOwnProducts)
route.post('/', Authorization({}), createProduct)
route.patch('/:id', Authorization({}), updateProduct)
route.get('/:id', getSingleProduct)
route.delete('/:id', Authorization({ roles: ['Admin', 'Aoba'] }), deleteProduct)
export { route as ProductRouter }
