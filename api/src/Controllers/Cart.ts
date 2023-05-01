import { ICart } from 'shared/Types/ICart'
import { RequestHandler } from 'express'
import mongoose from 'mongoose'
import { Cart, Product } from '../Models'

const getOwnCart: RequestHandler = async (req, res) => {
	const cart = await Cart.findOne({ user: req.user._id })
		.populate('products.product')
		.exec()
	res.json({ cart })
}

/**
 **Add Product To Cart
 * @route POST /cart/
 * @requires { product:string, quantity:number }
 * @response {cart: ICart}
 */
const addProductToCart: RequestHandler<
	{},
	{ cart: ICart },
	{ quantity: number; product: mongoose.Types.ObjectId }
> = async (req, res) => {
	const { quantity, product } = req.body

	//Validation
	if (!mongoose.isValidObjectId(product)) throw new Error('Invalid Product ID')
	if (!Number.isInteger(quantity))
		throw new Error('The amount cannot be a decimal value')

	const candidateProduct = await Product.findOne({ _id: product }).exec()
	if (!candidateProduct) throw new Error('Invalid Product')

	const cart = await Cart.findOne({ user: req.user._id }).exec()
	if (!cart) throw new Error('??????')
	if (quantity <= 0) {
		const cartWithDeleted = await Cart.findOneAndUpdate(
			{ user: req.user._id },
			{
				$pull: {
					products: {
						product,
					},
				},
			},
			{ new: true },
		).exec()
		if (!cartWithDeleted) throw new Error('Internal Error')
		res.json({ cart: cartWithDeleted })
		return
	}
	const existedProduct = cart.products.findIndex(
		(value, index) => value.product.toString() === product.toString(),
	)

	if (existedProduct !== -1) {
		/* So the product does already exist */
		cart.products[existedProduct].quantity = quantity
	} else {
		/* The product doesn't exists */
		cart.products.push({
			price: candidateProduct.price,
			product: candidateProduct._id,
			quantity,
		})
	}
	await cart.save()
	await cart.populate('products.product')
	console.log(cart.products[0].quantity)

	res.json({ cart })
}

//============================================REMOVE PRODUCT FROM CART
/**
 * @route DELETE /cart/:id
 * @params { id:string }
 * @response {message:'OK"}
 */
const removeProductFromCart: RequestHandler<
	{ id: string },
	{},
	{ product: mongoose.Types.ObjectId }
> = async (req, res) => {
	const { id } = req.params
	if (!mongoose.isValidObjectId(id)) throw new Error('Invalid Product ID')
	const cart = await Cart.findOneAndUpdate(
		{ user: req.user._id },
		{
			$pull: {
				products: {
					product: id,
				},
			},
		},
		{ new: true },
	).exec()
	if (!cart) throw new Error('User not found')
	res.status(204).json({ message: 'OK' })
}

export default { addProductToCart, removeProductFromCart, getOwnCart }
