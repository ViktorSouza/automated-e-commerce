import { Request, RequestHandler } from 'express'
import mongoose from 'mongoose'
import { Order, Product } from '../Models'
import { Stripe } from 'stripe'
import { loadStripe } from '@stripe/stripe-js'
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

interface IOrder {
	products: Item[]
	tax: number
	shippingFee: number
}

interface Item {
	product: string
	amount: number
}
/**======================
 **      Create Order
 * @route POST /orders/
 * @response {order:IOrder, clientSecret:string}
 *========================**/
const createOrder: RequestHandler = async (req, res) => {
	const cart = req.body as IOrder

	const { products } = cart
	//TODO change these values using a more real scenario
	const shippingFee = 1
	const tax = 1
	if (!products || products.length < 1) throw new Error('No items provided')
	if (!tax || !shippingFee) throw new Error('No tax or shipping fee provided')
	const orderItems = []
	let subtotal = 0

	console.log(cart)
	for (let product of products) {
		if (!mongoose.isValidObjectId(product.product))
			throw new Error('Invalid Id')
		const dbProduct = await Product.findOne({ _id: product.product }).exec()
		if (!dbProduct) throw new Error('Product not found')
		let { title, _id, price, image } = dbProduct
		price = Number(price)

		const singleOrder = {
			quantity: Number(product.amount),
			title,
			_id,
			price,
			image,
		}
		subtotal += price * Number(product.amount)
		orderItems.push(singleOrder)
	}
	const total = subtotal + tax + shippingFee

	const paymentIntent = await stripe.paymentIntents.create({
		amount: total,
		currency: 'brl',
		automatic_payment_methods: { enabled: true },
	})

	await stripe.paymentIntents.confirm(paymentIntent.id)

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

const AUTgetRandomOrder: RequestHandler = async (req, res) => {
	const count = await Order.count().exec()
	const random = Math.floor(Math.random() * count)
	const order = await Order.findOne().skip(random).exec()
	res.json({ product: order })
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
	AUTgetRandomOrder,
}
