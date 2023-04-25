import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { loginUser, getUser, logoutUser, createAccount } from '../services/user'
import { IUser, RegisterUserRequest } from 'shared/Types/IUser'
const defaultUser: IUser = {
	roles: [''],
	email: '',
	name: {
		first: '',
		last: '',
	},
	_id: '',
}
type IUserAddon = {
	isLogin: boolean
	isLoading: boolean
	login: (userData: { email: string; password: string }) => Promise<void>
	logout: () => Promise<void>
	register: ({
		firstName,
		lastName,
		email,
		password,
	}: RegisterUserRequest) => Promise<void>
}
const UserContext = createContext<{ user: IUser } & IUserAddon>({
	isLogin: false,
	login: async () => {},
	logout: async () => {},
	isLoading: true,
	register: async ({
		firstName,
		lastName,
		email,
		password,
	}: RegisterUserRequest) => {},
	user: {
		roles: [''],
		email: '',
		name: {
			first: '',
			last: '',
		},
		_id: '',
	},
})
import { useCookies } from 'react-cookie'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
const UserProvider = ({ children }: { children: ReactNode }) => {
	const queryClient = useQueryClient()
	const [cookies] = useCookies(['token'])
	const {
		data: user,
		isLoading,
		isSuccess,
		isError,
		error,
	} = useQuery<IUser>({
		queryKey: ['user'],
		initialData: defaultUser,
		retry: false,
		onError: () => {
			console.log('Error :D')
			return defaultUser
		},
		queryFn: async () => {
			const res = await getUser()
			return res
		},
		enabled: !!cookies.token,
	})

	const isLogin = !!user._id && !isLoading
	console.log(isLogin)

	const mutation = useMutation({
		mutationFn: ({ firstName, lastName, email, password }: RegisterUserRequest) =>
			createAccount({ firstName, lastName, email, password }),
		onSuccess() {
			queryClient.invalidateQueries(['user'])
		},
	})

	const login = async (userData: { email: string; password: string }) => {
		const userRes = await loginUser(userData)
		console.log('Heeey')

		queryClient.invalidateQueries(['user'])
		queryClient.setQueryData(['user'], userRes)
	}
	const logout = async () => {
		await logoutUser()
		queryClient.invalidateQueries(['user'])
		queryClient.resetQueries({ queryKey: ['user'] })
	}
	const register = async ({
		firstName,
		lastName,
		email,
		password,
	}: RegisterUserRequest) => {
		mutation.mutate({ firstName, lastName, email, password })
	}
	return (
		<UserContext.Provider
			// value={{ user, setUser, login, logout, addToCart, removeFromCart }}
			value={{ user, isLogin, login, logout, register, isLoading }}>
			{children}
		</UserContext.Provider>
	)
}

export { UserContext, UserProvider }
