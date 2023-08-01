import { RequestHandler, RequestParamHandler } from 'express'
import mongoose from 'mongoose'
import { Cart, Order, Product } from '../Models'
import { ICartPopulated } from '../Types/ICart'
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
	let {
		page_number = 0,
		page_size = 20,
		search = '',
		sort_by = 'title',
		max_value = Number.MAX_SAFE_INTEGER,
		min_value = 0,
		color = '',
	} = req.query
	page_number = page_number?.toString()
	page_size = page_size?.toString()
	//TODO limit the page size to 50
	const page = parseInt(page_number || '0')
	const size = parseInt(page_size || '20')
	const skipIndex = page * size
	const allOrders = await Order.find({ user: req.user._id })
		// .skip(skipIndex)
		// .limit(size)
		.exec()
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
 **      Create Ckeckout
 * @route POST /orders/create-checkout-session
 * @response {order:IOrder, clientSecret:string}
 *========================**/
const createCheckoutSession: RequestHandler = async (req, res) => {
	const userCart = (await Cart.findOne({
		user: req.user._id,
	})
		.populate('products.product')
		.exec()) as unknown as ICartPopulated | null

	if (!userCart) return res.json({ message: 'No cart found' })

	const cart = await Cart.findOne({
		user: req.user._id,
	}).exec()
	if (!cart) return res.status(400).json({ message: 'Please provide a cart' })
	const { products } = cart
	//TODO change these values using a more real scenario
	const shippingFee = 1
	const tax = 1
	if (!products || products.length < 1) throw new Error('No items provided')
	if (!tax || !shippingFee) throw new Error('No tax or shipping fee provided')
	const orderItems = []
	let subtotal = 0

	for (let product of products) {
		if (!mongoose.isValidObjectId(product.product))
			throw new Error('Invalid Id')
		const dbProduct = await Product.findOne({ _id: product.product }).exec()
		if (!dbProduct) throw new Error('Product not found')
		let { title, _id, price, image } = dbProduct
		price = Number(price)

		const singleOrder = {
			quantity: Number(product.quantity),
			title,
			_id,
			price,
			image,
		}
		subtotal += price * Number(product.quantity)
		orderItems.push(singleOrder)
	}
	const total = subtotal + tax + shippingFee

	const session = await stripe.checkout.sessions.create({
		line_items: [
			...userCart.products.map((product) => {
				console.log(product)
				return {
					price_data: {
						currency: 'brl',
						product_data: {
							name: product.product.title,
							images: [product.product.image],
						},
						unit_amount: product.price * 100,
					},
					quantity: product.quantity,
				}
			}),
		],
		mode: 'payment',
		success_url: new URL('/sucess', process.env.CLIENT_URL).toString(),
		cancel_url: new URL('/cancel', process.env.CLIENT_URL).toString(),
	})

	await Order.create({
		orderItems,
		total,
		shippingFee,
		subtotal,
		status: 'pendent',
		user: req.user._id,
		clientSecret: session.id,
	})
	// await Cart.updateOne({ user: req.user._id }, { products: [] }).exec()

	res.redirect(303, session.url ?? '')
}
/**======================
 **      Create Order
 * @route POST /orders/
 * @response {order:IOrder, clientSecret:string}
 *========================**/
const createOrder: RequestHandler = async (req, res) => {
	const cart = req.body as IOrder & { automatic: boolean }

	const { products, automatic } = cart
	//TODO change these values using a more real scenario
	const shippingFee = 1
	const tax = 1
	if (!products || products.length < 1) throw new Error('No items provided')
	if (!tax || !shippingFee) throw new Error('No tax or shipping fee provided')
	const orderItems = []
	let subtotal = 0

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
		...(automatic && { confirm: true }),
		...(automatic && { capture_method: 'automatic' }),
		payment_method: 'pm_card_visa',
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
	createCheckoutSession,
}
