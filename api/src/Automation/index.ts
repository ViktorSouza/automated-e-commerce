import axios from 'axios'
import { faker } from '@faker-js/faker'
import { ObjectId } from 'mongoose'
export default function automation() {
	setTimeout(createAccount, randomIntFromInterval(1000 * 50, 1000 * 60 * 2))
	setTimeout(createProduct, randomIntFromInterval(1000 * 5, 1000 * 6 * 2))
}
function createAccount() {
	const firstName = faker.name.firstName()
	const lastName = faker.name.lastName()
	const informations = {
		name: {
			first: firstName,
			last: lastName,
		},
		password: 'password',
		email: faker.internet.email(firstName, lastName),
	}

	axios
		.post('http://127.0.0.1:4000/api/v1/auth/register', informations)
		.catch((err) => {
		})
	setTimeout(createAccount, randomIntFromInterval(1000 * 50, 1000 * 60 * 2))
}

type UserResponse = {
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
async function getRandomUser() {
	let randomUser: UserResponse | {} = {}

	await axios
		.get('http://192.168.0.100:4000/api/v1/auth/AUTlogin')
		.then((res) => {
			randomUser = res.data as UserResponse
		})
		.catch((err) => {
		})

	return randomUser
}

async function createProduct() {
	const randomUser = (await getRandomUser()) as UserResponse
	const product = {
		title: faker.commerce.product(),
		description: faker.commerce.productDescription(),
		price: faker.commerce.price(),
		colors: [faker.color.rgb({ prefix: '#' })],
	}
	axios
		.post('http://192.168.0.100:4000/api/v1/product', product, {
			headers: {
				Cookie: `token=${randomUser.token};`,
			},
		})
		.catch((err) => {})
	setTimeout(createProduct, randomIntFromInterval(1000 * 5, 1000 * 6 * 2))
}
function randomIntFromInterval(min: number, max: number) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min)
}
