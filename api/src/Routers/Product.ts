import express from 'express'
const route = express.Router()
import { Product } from '../Controllers'
import { Authorization } from '../Middlewares'
const {
	updateProduct,
	AUTgetRandomProduct,
	createProduct,
	deleteProduct,
	getAllProducts,
	getSingleProduct,
	getOwnProducts,
	getReviewsFromProduct,
} = Product
route.get('/', getAllProducts)
route.get('/AUTrandomProduct', AUTgetRandomProduct)
route.get('/own-products', Authorization({}), getOwnProducts)
route.post('/', Authorization({}), createProduct)
route.patch('/:id', Authorization({}), updateProduct)
route.get('/:id/reviews', getReviewsFromProduct)
route.get('/:id', getSingleProduct)
route.delete('/:id', Authorization({ roles: ['Admin', 'Aoba'] }), deleteProduct)
export { route as ProductRouter }
