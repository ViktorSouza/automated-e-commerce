import { UserReponseLogin, api } from './index'

export async function getRandomUser(): Promise<{}> {
	let randomUser: UserReponseLogin | {} = {}
	
	await api
		.get('/auth/AUTlogin')
		.then((res) => {
			randomUser = res.data as UserReponseLogin
		})
		.catch((err) => {
			console.log('Error on getRandomUser')
		})

	return randomUser
}
