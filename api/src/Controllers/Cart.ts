import { ICart } from 'shared/Types/ICart'
import { RequestHandler } from 'express'
import mongoose from 'mongoose'
import { Cart, Product } from '../Models'
import { log } from 'console'

//-------'
const addProductToCart: RequestHandler<
	{},
	{},
	{ quantity: number; product: mongoose.Types.ObjectId }
> = async (req, res) => {
	const { quantity, product } = req.body

	if (!mongoose.isValidObjectId(product)) throw new Error('Invalid Product ID')
	const candidateProduct = await Product.findOne({ _id: product }).exec()
	if (!candidateProduct) throw new Error('Invalid Product')

	if (!Number.isInteger(quantity))
		throw new Error('The amount cannot be a decimal value')

	const cart = await Cart.findOne({ user: req.user._id }).exec()
	if (!cart) throw new Error('??????')
	const existedProduct = cart.products.findIndex(
		(value, index) => value.product.toString() === product.toString(),
	)
	if (existedProduct !== -1 /* So the product does already exist */) {
		cart.products[existedProduct].quantity = quantity
	} else {
		cart.products.push({
			price: candidateProduct.price,
			product: candidateProduct._id,
			quantity,
		})
	}
	await cart.save()
	res.json({ cart })
}

//----------
const removeProductFromCart: RequestHandler<
	{},
	{},
	{ product: mongoose.Types.ObjectId }
> = async (req, res) => {
	const { product } = req.body
	if (!mongoose.isValidObjectId(product)) throw new Error('Invalid Product ID')
	const cart = await Cart.findOneAndUpdate(
		{ _id: req.user._id },
		{
			$unset: {
				'products.product': product,
			},
		},
		{ new: true },
	).exec()
	if (!cart) throw new Error('User not found')
	res.status(204)
}

export default { addProductToCart, removeProductFromCart }
