import express from 'express'
import { Order } from '../Controllers'
import { Authorization } from '../Middlewares'
const {
	createOrder,
	getAllOrders,
	getCurrentOrder,
	getSingleOrder,
	createCheckoutSession,
	AUTgetRandomOrder,
	updateOrder,
} = Order
const route = express.Router()
route.post('/', Authorization({}), createOrder)
route.post('/create-checkout-session', Authorization({}), createCheckoutSession)
route.post('/AUTrandomProduct', AUTgetRandomOrder)
route.get('/', Authorization({}), getAllOrders)
route.get('/:id', Authorization({}), getSingleOrder)
route.patch('/:id', Authorization({}), updateOrder)

export { route as OrderRouter }
