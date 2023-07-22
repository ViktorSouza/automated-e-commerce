import dotenv from 'dotenv'
//Express dependencies
require('express-async-errors')
import helmet from 'helmet'
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
app.disable('x-powered-by')
app.use(helmet())
app.use(cookieParser(process.env.SECRET ?? ''))
app.use(express.json())
app.use(
	cors({
		origin: '*',
		credentials: true,
		// exposedHeaders:['set-cookie']
	}),
)

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
} from './routers'
import { ZodError } from 'zod'
import mongoose from 'mongoose'
app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/cart', CartRouter)
app.use('/api/v1/review', ReviewRouter)
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/order', OrderRouter)
app.use('/api/v1/product', ProductRouter)

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
	console.log(err)
	if (err instanceof mongoose.Error) {
		//TODO too much generic
		res.status(500).json({ error: err.message })
		return
	}
	if (err instanceof ZodError) {
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
	console.log('Connected')
	app.listen(4000)
}
start()
