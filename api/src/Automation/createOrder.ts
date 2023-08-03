import { getRandomUser } from './getRandomUser'
import { AUTOMATION_TIMES, UserReponseLogin, api } from './index'
import { Product } from '../Models'
import { randomIntFromInterval } from '../Utils'

export async function createOrder(): Promise<void> {
	const randomUser = (await getRandomUser()) as UserReponseLogin
	if (!randomUser) return console.log('No user')
	const randomProductsValue = Math.floor(Math.random() * 10)

	const randomProducts = await Product.find({})
		.skip(randomProductsValue)
		.limit(Math.floor(Math.random() * 5))
		.exec()
	if (!randomProducts) return

	const order = {
		products: randomProducts.map((product) => ({
			product: product._id,
			amount: Math.floor((Math.random() * 15) / (product.price / 10)),
		})),
		tax: 0,
		shippingFee: 500,
	}
	api
		.post(
			'/orders',
			{ ...order, automatic: true },
			{
				headers: {
					Cookie: `token=${randomUser.token};`,
				},
			},
		)
		.catch((err) => {
			console.error(err)
		})
	setTimeout(
		createOrder,
		randomIntFromInterval(...AUTOMATION_TIMES.createOrder),
	)
}
