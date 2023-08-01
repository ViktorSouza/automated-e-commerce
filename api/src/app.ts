import dotenv from 'dotenv'
//Express dependencies
require('express-async-errors')
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import express, { ErrorRequestHandler } from 'express'
import { connectDB } from './Utils'
dotenv.config({ path: './.env' })

//TODO make all errors better
//TODO make some abstrations
//TODO make the pagination system to everything
//TODO make statistics, such as number of products, number of users, growth, etc

const app = express()
app.use(
	cors({
		origin: [
			'https://automated-e-commerce.vercel.app',
			'http://localhost:5173',
		],
		credentials: true,
		optionsSuccessStatus: 200,
		// exposedHeaders: ['set-cookie'],
	}),
)
import { Stripe } from 'stripe'
import { Order } from './Models'
const stripe = new Stripe(process.env.STRIPE_TOKEN ?? '', {
	apiVersion: '2022-11-15',
})
const endpointSecret = process.env.API_ENDPOINT_SECRET ?? ''

app.post(
	'/webhook',
	bodyParser.raw({ type: 'application/json' }),
	async (request, response) => {
		console.log('Hallo')
		const sig = request.headers['stripe-signature'] ?? ''

		let event

		try {
			event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret)
		} catch (err: any) {
			return response.status(400).send(`Webhook Error: ${err.message}`)
		}

		if (event.type === 'checkout.session.completed') {
			await Order.updateOne(
				//@ts-ignore
				{ clientSecret: event.data.object.id as string },
				//@ts-ignore
				{ status: event.data.object.payment_status as string },
			).exec()
		}

		response.status(200).end()
	},
)

app.use(helmet())
app.use(cookieParser(process.env.SECRET ?? ''))
app.use(express.json())
app.use(morgan('tiny'))

/**======================
 **    ROUTERS
 *========================**/
import {
	AuthRouter,
	ReviewRouter,
	UserRouter,
	CartRouter,
	OrderRouter,
	AdminRouter,
	ProductRouter,
} from './Routers'
import { ZodError } from 'zod'
import mongoose from 'mongoose'
import automation from './Automation'
app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/carts', CartRouter)
app.use('/api/v1/reviews', ReviewRouter)
app.use('/api/v1/users', UserRouter)
app.use('/api/v1/admin', AdminRouter)
app.use('/api/v1/orders', OrderRouter)
app.use('/api/v1/products', ProductRouter)

/**======================
 **    ERROR HANDLER
 *========================**/

const ErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
	// return res.status(500).json({ error: err })
	if (err instanceof TypeError) {
		res.status(500).json({ error: err.message })
		return
	}

	if (err.type === 'entity.parse.failed') {
		//* This error is thrown when the client sends an invalid JSON
		res.status(400).json({ error: 'Failed to parse entity.' })
		return
	}
	if (err instanceof mongoose.Error) {
		//TODO too much generic
		console.log(err.name)
		res.status(500).json({ error: err.message })
		return
	}
	if (err instanceof ZodError) {
		console.log(err.errors)
		res.status(500).json({ error: err.errors })
		return
	}
	//! The Error instance must be the last one
	if (err instanceof Error) {
		res.status(500).json({ error: err.message })
	}
}
app.use(ErrorHandler)

async function start() {
	await connectDB(process.env.MONGO_URL ?? '')
	automation()
	console.log('Connected')
	app.listen(4000)
}
start()
