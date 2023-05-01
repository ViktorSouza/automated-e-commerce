import { IUser, RegisterUserRequest } from 'shared/Types/IUser'
import { api } from './api'

const defaultUser: IUser = {
	roles: [''],
	email: '',
	wishlist: [],
	name: {
		first: '',
		last: '',
	},
	_id: '',
}
export async function getUser(): Promise<IUser> {
	const res = await api.get('/user/showMe')
	if (res.status !== 200) return defaultUser
	return res.data.user
}
export async function loginUser({
	email,
	password,
}: {
	email: string
	password: string
}): Promise<IUser> {
	const res = await api.post(
		'/auth/login',
		{ email, password },
		{ headers: {} },
	)

	return res.data.user
}
export async function logoutUser(): Promise<void> {
	await api.get('/auth/logout')
}

export async function createAccount({
	firstName,
	lastName,
	email,
	password,
}: RegisterUserRequest) {
	const res = await api.post('/auth/register', {
		name: {
			first: firstName,
			last: lastName,
		},
		email,
		password,
	})

	return res.data.user
}
