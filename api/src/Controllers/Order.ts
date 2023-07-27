import { Request, RequestHandler } from 'express'
import mongoose from 'mongoose'
import { Order, Product } from '../Models'
import { ICart } from '../../../shared/Types/ICart'
import { Stripe } from 'stripe'
const stripe = new Stripe(process.env.STRIPE_TOKEN ?? '', {
	apiVersion: '2022-11-15',
})

//TODO make the IOrder and put here
/**======================
 **      Get All Orders
 * @route GET /orders/
 * @response {orders:IOrder[]}
 *========================**/
const getAllOrders: RequestHandler = async (req, res) => {
	const allOrders = await Order.find({ user: req.user._id }).exec()
	res.json({ orders: allOrders })
}
/**======================
 **      Get Single Order
 * @route GET /orders/:id
 * @response {order:IOrder}
 *========================**/
const getSingleOrder: RequestHandler = async (req, res) => {
	const { id } = req.params
	if (!mongoose.isValidObjectId(id)) throw new Error('Invalid ID')
	const singleOrder = await Order.findOne({ _id: id }).exec()
	if (!singleOrder) throw new Error('Order not found')
	res.json({
		order: singleOrder,
	})
}
//TODO do something with the getCurrentOrder
const getCurrentOrder: RequestHandler = async (req, res) => {
	res.send('Hey')
}

/**======================
 **      Create Order
 * @route POST /orders/
 * @response {order:IOrder, clientSecret:string}
 *========================**/
const createOrder: RequestHandler = async (req: Request, res) => {
	const cart: ICart = req.body
	const { products } = cart
	//TODO change these values using a more real scenario
	const shippingFee = 0
	const tax = 0
	if (!products || products.length < 1) throw new Error('No itens provided')
	if (!tax || !shippingFee) throw new Error('No tax or shipping fee provided')
	const orderItems = []
	let subtotal = 0

	for (let item of products) {
		if (!mongoose.isValidObjectId(item.product)) throw new Error('Invalid Id')
		const dbProduct = await Product.findOne({ _id: item.product }).exec()
		if (!dbProduct) throw new Error('Product not found')
		const { title, _id, price, image } = dbProduct
		const singleOrder = {
			quantity: item.quantity,
			title,
			_id,
			price,
			image,
		}
		subtotal += dbProduct.price * item.quantity
		orderItems.push(singleOrder)
	}
	const total = subtotal + tax + shippingFee

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total,
		currency: 'brl',
		automatic_payment_methods: { enabled: true },
	})
	const order = await Order.create({
		orderItems,
		total,
		shippingFee,
		subtotal,
		status: 'pendent',
		user: req.user._id,
		clientSecret: paymentIntent.client_secret,
	})

	res.json({
		order,
		clientSecret: order.clientSecret,
	})
}
const updateOrder: RequestHandler = async (req, res) => {
	//TODO create
	res.send('Hey')
}
export default {
	getAllOrders,
	getSingleOrder,
	getCurrentOrder,
	createOrder,
	updateOrder,
}
