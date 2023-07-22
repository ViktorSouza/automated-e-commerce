import express from 'express'
import { Cart } from '../controllers'
import { Authorization } from '../middlewares'
const { addProductToCart, removeProductFromCart, getOwnCart } = Cart
const route = express.Router()
route.post('/', Authorization({}), addProductToCart)
route.delete('/:id', Authorization({}), removeProductFromCart)
route.get('/', Authorization({}), getOwnCart)

export { route as CartRouter }
