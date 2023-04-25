import dotenv from 'dotenv'
import helmet from 'helmet'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import automation from './Automation'
import crypto from 'crypto'
require('express-async-errors')
import https from 'https'
dotenv.config({ path: './.env' })
import express, { ErrorRequestHandler } from 'express'
//TODO make all errors better
//TODO make some abstrations

const app = express()
import { connectDB } from './Utils'

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

import {
	AuthRouter,
	ReviewRouter,
	UserRouter,
	CartRouter,
	OrderRouter,
	ProductRouter,
} from './Routers'
app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/cart', CartRouter)
app.use('/api/v1/review', ReviewRouter)
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/order', OrderRouter)
app.use('/api/v1/product', ProductRouter)
const bah: ErrorRequestHandler = (err, req, res, next) => {
	if (err instanceof Error) {
		res.status(500).json({ error: err.message })
	}
}

app.use(bah)

app.get('/', (req, res) => {
	res.send('Hello')
})

async function start() {
	await connectDB(process.env.MONGO_URL)
	console.log('Connected')
	app.listen(4000)
	automation()
}

start()
