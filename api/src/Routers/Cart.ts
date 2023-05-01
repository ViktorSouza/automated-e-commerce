import express from 'express'
import { Cart } from '../Controllers'
import { Authorization } from '../Middlewares'
const { addProductToCart, removeProductFromCart, getOwnCart } = Cart
const route = express.Router()
route.post('/', Authorization({}), addProductToCart)
route.delete('/:id', Authorization({}), removeProductFromCart)
route.get('/', Authorization({}), getOwnCart)

export { route as CartRouter }
