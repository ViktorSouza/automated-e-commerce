import dotenv from 'dotenv'
//Express dependencies
require('express-async-errors')
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import automation from './Automation'
import express, { ErrorRequestHandler } from 'express'
import { connectDB } from './Utils'
dotenv.config({ path: './.env' })

//TODO make all errors better
//TODO make some abstrations
//TODO make the pagination system to everything

const app = express()

app.disable('x-powered-by')
app.use(helmet())
app.use(cookieParser(process.env.SECRET))
app.use(express.json())
app.use(
	cors({
		origin: 'http://127.0.0.1:5173',
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
} from './Routers'
import { ZodError } from 'zod'
import { MongooseError } from 'mongoose'
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
	if (err instanceof MongooseError) {
		//TODO too much generic
		res.status(500).json({ error: err.cause })
		return
	}
	if (err instanceof ZodError) {
		res.status(500).json({ error: err.format()._errors })
		return
	}
	//! The Error instance must be the last one
	if (err instanceof Error) {
		res.status(500).json({ error: err.message })
	}
}
app.use(ErrorHandler)

async function start() {
	await connectDB(process.env.MONGO_URL)
	console.log('Connected')
	app.listen(4000)
	//TODO transform the automation more "independent" transforming the settings into parameter
	// automation()
}

start()
