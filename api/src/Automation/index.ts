import axios from 'axios'
import { randomIntFromInterval } from '../Utils'
import { ObjectId } from 'mongoose'
import { createAccount } from './createAccount'
import { createReview } from './createReview'
import { createProduct } from './createProduct'
import { createOrder } from './createOrder'
const BASE_URL = process.env.API_URL
export const api = axios.create({
	baseURL: BASE_URL,
})

export const AUTOMATION_TIMES: {
	[key: string]: [min: number, max: number]
} = {
	createReview: [1000 * 60 * 10, 1000 * 60 * 20],
	createOrder: [1000 * 60 * 5, 1000 * 60 * 20],
	createAccount: [1000 * 60 * 30, 1000 * 60 * 60],
	createProduct: [1000 * 60 * 10, 1000 * 60 * 50],
}

export default function automation() {
	setTimeout(
		createAccount,
		randomIntFromInterval(...AUTOMATION_TIMES.createAccount),
	)
	setTimeout(
		createProduct,
		randomIntFromInterval(...AUTOMATION_TIMES.createProduct),
	)
	setTimeout(
		createReview,
		randomIntFromInterval(...AUTOMATION_TIMES.createReview),
	)
	setTimeout(
		createOrder,
		randomIntFromInterval(...AUTOMATION_TIMES.createOrder),
	)
}

export type UserReponseLogin = {
	user: {
		name: {
			first: string
			last: string
		}
		email: string
		_id: ObjectId
	}
	token: string
}
