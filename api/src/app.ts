import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import automation from './Automation'
require('express-async-errors')
dotenv.config({ path: './.env' })
import express from 'express'

const app = express()
import {
	AuthRouter,
	ReviewRouter,
	UserRouter,
	OrderRouter,
	ProductRouter,
} from './Routers'
import { connectDB } from './Utils'
app.use(cookieParser(process.env.SECRET))
app.use(express.json())

app.use(cors({ origin: '*' }))
app.use('/api/v1/auth', AuthRouter)
app.use('/api/v1/review', ReviewRouter)
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/order', OrderRouter)
app.use('/api/v1/product', ProductRouter)

app.get('/', (req, res) => {
	res.send('Hello')
})
async function start() {
	await connectDB(process.env.MONGO_URL)
	console.log('Connected')

	app.listen(4000)
}

start()

automation()
