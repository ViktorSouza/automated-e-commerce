import { faker } from '@faker-js/faker'
import { getRandomUser } from './getRandomUser'
import { UserReponseLogin, api, AUTOMATION_TIMES } from './index'
import { AxiosResponse } from 'axios'
import { IProduct } from '../Types/IProduct'
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
	/* {
    "products": [
        {
            "product": "644f1460d377993ec32d8abe",
            "amount": 3
        },
                {
            "product": "64484640d6681a98f93810e1",
            "amount": 5
        }
    ],
    "tax": 5000,    
    "shippingFee": 5000
} */
	const order = {
		products: randomProducts.map((product) => ({
			product: product._id,
			amount: Math.floor(Math.random() * 15),
		})),
		tax: 0,
		shippingFee: 500,
	}
	api
		.post('/orders', order, {
			headers: {
				Cookie: `token=${randomUser.token};`,
			},
		})
		.catch((err) => {
			console.log('Error :D')
		})
	// setTimeout(
	// 	createOrder,
	// 	randomIntFromInterval(...AUTOMATION_TIMES.createOrder),
	// )
}
