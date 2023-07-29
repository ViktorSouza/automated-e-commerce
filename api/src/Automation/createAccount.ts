import { faker } from '@faker-js/faker'
import { api, AUTOMATION_TIMES } from './index'
import { randomIntFromInterval } from '../Utils'

export function createAccount() {
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

	api.post('/auth/register', informations).catch((err) => {
		console.log('Error on createAccount')
	})
	setTimeout(
		createAccount,
		randomIntFromInterval(...AUTOMATION_TIMES.createOrder),
	)
}
