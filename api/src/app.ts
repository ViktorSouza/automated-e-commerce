import dotenv from 'dotenv'
//Express dependencies
require('express-async-errors')
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
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
// app.disable('x-powered-by')
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
	ProductRouter,
} from './Routers'
import { ZodError } from 'zod'
import mongoose from 'mongoose'
import automation from './Automation'
app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/carts', CartRouter)
app.use('/api/v1/reviews', ReviewRouter)
app.use('/api/v1/users', UserRouter)
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
