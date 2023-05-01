import { AxiosError } from 'axios'
import { log } from 'console'
import { UserReponseLogin, api } from './index'

export async function getRandomUser(): Promise<{}> {
	let randomUser: UserReponseLogin | {} = {}

	await api
		.post('/auth/AUTlogin')
		.then((res) => {
			randomUser = res.data as UserReponseLogin
		})
		.catch((err) => {
			console.log(err)
		})

	return randomUser
}
