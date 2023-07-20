import { createContext, ReactNode, useEffect, useMemo, useState } from 'react'
import { loginUser, getUser, logoutUser, createAccount } from '../services/user'
import { IUser, RegisterUserRequest } from 'shared/Types/IUser'
import { useCookies } from 'react-cookie'
import {
	useQuery,
	useMutation,
	useQueryClient,
	UseMutationResult,
	UseMutationOptions,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useLocation } from 'react-router-dom'
import { addToWishlist, removeFromWishlist } from '../services/wishlist'

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
type IUserAddon = {
	isLogin: boolean
	userStatus: 'error' | 'success' | 'loading'
	addToWishlistMutation: UseMutationResult<
		unknown,
		unknown,
		{ product: string },
		unknown
	>
	removeFromWishlistMutation: UseMutationResult<
		unknown,
		unknown,
		{ product: string },
		unknown
	>
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
	addToWishlistMutation: {} as UseMutationResult<
		unknown,
		unknown,
		{ product: string },
		unknown
	>,
	removeFromWishlistMutation: {} as UseMutationResult<
		unknown,
		unknown,
		{ product: string },
		unknown
	>,
	login: async () => {},
	logout: async () => {},
	userStatus: 'loading',
	register: async ({
		firstName,
		lastName,
		email,
		password,
	}: RegisterUserRequest) => {},
	user: {
		roles: [''],
		wishlist: [],
		email: '',
		name: {
			first: '',
			last: '',
		},
		_id: '',
	},
})

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const queryClient = useQueryClient()
	const { data: user, status: userStatus } = useQuery<IUser>({
		queryKey: ['user'],
		keepPreviousData: true,
		staleTime: 5000,
		retry: false,
		queryFn: getUser,
		onSuccess() {
			setIsLogin(true)
		},
	})

	//TODO change this value
	const [isLogin, setIsLogin] = useState<boolean>(
		userStatus === 'success' && user._id !== '',
	)

	const userMutation = useMutation({
		mutationFn: ({
			firstName,
			lastName,
			email,
			password,
		}: RegisterUserRequest) =>
			createAccount({ firstName, lastName, email, password }),
		onSuccess() {
			queryClient.invalidateQueries(['user'])
		},
	})

	const addToWishlistMutation = useMutation({
		mutationFn: ({ product }: { product: string }) =>
			addToWishlist({ product }),
		onSuccess: () => {
			queryClient.invalidateQueries(['user'])
		},
	})
	const removeFromWishlistMutation = useMutation({
		mutationFn: ({ product }: { product: string }) =>
			removeFromWishlist({ product }),
		onSuccess() {
			queryClient.invalidateQueries(['user'])
		},
	})

	const login = async (userData: { email: string; password: string }) => {
		const userRes = await loginUser(userData)
		queryClient.invalidateQueries(['user', 'cart'])
		queryClient.setQueryData(['user'], userRes)
		setIsLogin(true)
	}

	console.log(user)

	const logout = async () => {
		await logoutUser()
		//TODO the data is still available, so the data must be deleted
		// queryClient.refetchQueries(['user'])
		// queryClient.refetchQueries(['cart'])
		queryClient.removeQueries(['user'])
		queryClient.removeQueries(['cart'])
		setIsLogin(false)
	}
	const register = async ({
		firstName,
		lastName,
		email,
		password,
	}: RegisterUserRequest) => {
		userMutation.mutate({ firstName, lastName, email, password })
	}
	const value = useMemo(
		() => ({
			user: userStatus === 'success' ? user : defaultUser,
			isLogin,
			login,
			logout,
			register,
			userStatus,
			addToWishlistMutation,
			removeFromWishlistMutation,
		}),
		[
			user,
			isLogin,
			login,
			logout,
			register,
			userStatus,
			addToWishlistMutation,
			removeFromWishlistMutation,
		],
	)
	return (
		<UserContext.Provider
			// value={{ user, setUser, login, logout, addToCart, removeFromCart }}
			value={value}>
			{children}
		</UserContext.Provider>
	)
}

export { UserContext, UserProvider }
