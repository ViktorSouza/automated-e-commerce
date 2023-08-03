import { RequestHandler } from 'express'
import { Cart, Order } from '../Models'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_TOKEN ?? '', {
	apiVersion: '2022-11-15',
})
const endpointSecret = process.env.API_ENDPOINT_SECRET ?? ''

export const webHookController: RequestHandler = async (req, res) => {
	const sig = req.headers['stripe-signature'] ?? ''

	let event

	try {
		event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
	} catch (err: any) {
		return res.status(400).send(`Webhook Error: ${err.message}`)
	}

	if (event.type === 'checkout.session.completed') {
		const order = await Order.findOneAndUpdate(
			//@ts-ignore
			{ clientSecret: event.data.object.id as string },
			//@ts-ignore
			{ status: event.data.object.payment_status as string },
			{ new: true },
		).exec()
		if (!order) return
		await Cart.updateOne(
			{ user: order.user },
			{
				products: [],
			},
		).exec()
	}

	res.status(200).end()
}
