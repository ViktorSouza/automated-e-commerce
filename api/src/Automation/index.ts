import axios from 'axios'
import { faker } from '@faker-js/faker'
import { ObjectId } from 'mongoose'
export default function automation() {
	setTimeout(
		createAccount,
		randomIntFromInterval(...AUTOMATION_TIMES.createAccount),
	)
	setTimeout(createProduct, ...AUTOMATION_TIMES.createProduct)
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
		.catch((err) => {console.log('Error on createAccount');
		})
	setTimeout(createAccount, ...AUTOMATION_TIMES.createAccount)
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
		.get('http://192.168.0.103:4000/api/v1/auth/AUTlogin')
		.then((res) => {
			randomUser = res.data as UserResponse
		})
		.catch((err) => {console.log('Error on getRandomUser');
		})

	return randomUser
}

async function createReview() {
	const randomUser = (await getRandomUser()) as UserResponse
	const randomProduct = await axios.get(
		'http://192.168.0.103:4000/api/v1/product/AUTrandomProduct',
	)
	console.log(randomProduct.data.product._id)

	const review = {
		comment: faker.commerce.productDescription(),
		stars: (Math.random() * 5).toFixed(2),
		product: randomProduct.data.product._id,
	}
	axios
		.post('http://192.168.0.103:4000/api/v1/review', review, {
			headers: {
				Cookie: `token=${randomUser.token};`,
			},
		})
		.then((res) => {
			console.log(res.data)
		}).catch(()=>{console.log('Error on createReview');
		})
}
createReview()
async function createProduct() {
	console.log('hey')

	const randomUser = (await getRandomUser()) as UserResponse
	const product = {
		title: faker.commerce.product(),
		description: faker.lorem.sentence(9),
		price: faker.commerce.price(),
		colors: [faker.color.rgb({ prefix: '#' })],
	}
	axios
		.post('http://192.168.0.103:4000/api/v1/product', product, {
			headers: {
				Cookie: `token=${randomUser.token};`,
			},
		})
		.then((res) => {})
		.catch((err) => {
			console.log('Error :D')
		})
	setTimeout(createProduct, ...AUTOMATION_TIMES.createAccount)
}
function randomIntFromInterval(min: number, max: number) {
	// min and max included
	return Math.floor(Math.random() * (max - min + 1) + min)
}

const AUTOMATION_TIMES: {
	[key: string]: [min: number, max: number]
} = {
	createReview: [1000 * 20, 1000 * 60],
	createAccount: [1000 * 20, 1000 * 60],
	createProduct: [1000 * 20, 1000 * 60],
}
