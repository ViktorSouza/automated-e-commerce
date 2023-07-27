import { faker } from '@faker-js/faker'
import { AxiosResponse } from 'axios'
import { IProduct } from '../Types/IProduct'
import { getRandomUser } from './getRandomUser'
import { UserReponseLogin, api, AUTOMATION_TIMES } from './index'

export async function createReview(): Promise<void> {
	const randomUser = (await getRandomUser()) as UserReponseLogin
	const randomProduct: AxiosResponse<{ product: IProduct }> | undefined =
		await api.get('/products/AUTrandomProduct')

	if (!randomProduct?.data.product) return
	if (!randomUser) return
	const review = {
		comment: faker.lorem.sentences(),
		rating: (Math.random() * 5).toFixed(1),
		product: randomProduct.data.product._id,
	}

	if (!randomUser) return
	api
		.post('/reviews', review, {
			headers: {
				Cookie: `token=${randomUser.token};`,
			},
		})
		.catch((error) => {
			// console.log(error)
		})
	setTimeout(createReview, ...AUTOMATION_TIMES.createReview)
}
