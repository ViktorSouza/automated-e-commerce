import axios from 'axios'
import { randomIntFromInterval } from '../Utils'
import { ObjectId } from 'mongoose'
import { createAccount } from './createAccount'
import { createReview } from './createReview'
import { createProduct } from './createProduct'
const BASE_URL = process.env.URL
export const api = axios.create({
	baseURL: BASE_URL,
})

export const AUTOMATION_TIMES: {
	[key: string]: [min: number, max: number]
} = {
	createReview: [1000 * 1, 1000 * 2],
	createAccount: [1000 * 60 * 1, 1000 * 60 * 3],
	createProduct: [1000 * 60 * 1, 1000 * 60 * 3],
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
