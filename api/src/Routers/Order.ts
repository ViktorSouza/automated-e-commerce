import express from 'express'
import { Order } from '../Controllers'
import { Authorization } from '../Middlewares'
const {
	createOrder,
	getAllOrders,
	getCurrentOrder,
	getSingleOrder,
	updateOrder,
} = Order
const route = express.Router()
route.post('/', Authorization({}), createOrder)
route.get('/', Authorization({ roles: ['Admin'] }), getAllOrders)
route.get('/:id', Authorization({}), getSingleOrder)
route.patch('/:id', Authorization({}), updateOrder)

export { route as OrderRouter }
