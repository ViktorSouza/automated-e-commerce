import { faker } from '@faker-js/faker'
import { getRandomUser } from './getRandomUser'
import { UserReponseLogin, api, AUTOMATION_TIMES } from './index'
import { randomIntFromInterval } from '../Utils'

export async function createProduct(): Promise<void> {
	const randomUser = (await getRandomUser()) as UserReponseLogin
	const title = faker.commerce.product()
	const product = {
		image: faker.image.imageUrl(undefined, undefined, 'chicken', true),
		title,
		description: faker.lorem.sentence(9),
		price: faker.commerce.price(),
		colors: [faker.color.rgb({ prefix: '#' })],
	}
	if (!randomUser) return
	api
		.post('/products', product, {
			headers: {
				Cookie: `token=${randomUser.token};`,
			},
		})
		.then((res) => {})
		.catch((err) => {
			console.log('Error :D')
		})
	setTimeout(
		createProduct,
		randomIntFromInterval(...AUTOMATION_TIMES.createOrder),
	)
}
