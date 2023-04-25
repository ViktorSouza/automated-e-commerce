import express from 'express'
import { Cart } from '../Controllers'
import { Authorization } from '../Middlewares'
const { addProductToCart, removeProductFromCart } = Cart
const route = express.Router()
route.post('/', Authorization({}), addProductToCart)
route.delete('/', Authorization({}), removeProductFromCart)

export { route as CartRouter }
