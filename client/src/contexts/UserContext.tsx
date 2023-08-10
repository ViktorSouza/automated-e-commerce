import {
	createContext,
	ReactNode,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { loginUser, getUser, logoutUser, createAccount } from '../services/user'
import { IUser, RegisterUserRequest } from 'shared/Types/IUser'
import { api } from '../services/api'

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
	setIsLogin: React.Dispatch<SetStateAction<boolean>>
	userStatus: 'error' | 'success' | 'loading'
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
	setIsLogin() {},
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
	const [user, setUser] = useState(defaultUser)
	const [userStatus, setUserStatus] = useState<'success' | 'loading'>('loading')
	// user._id === '' ? 'loading' : 'success'

	//TODO change this value
	const [isLogin, setIsLogin] = useState<boolean>(false)

	const login = useCallback(
		async (userData: { email: string; password: string }) => {
			await loginUser(userData)
			setIsLogin(true)
		},
		[],
	)

	useEffect(() => {
		api
			.get('/users/showMe')
			.then((res) => {
				if (res.data.user) {
					setUser(res.data.user)
					setIsLogin(true)
					setUserStatus('success')
				}
			})
			.catch((error) => {
				setIsLogin(false)
				setUserStatus('success')
			})
	}, [])

	const logout = async () => {
		await logoutUser()
		//TODO the data is still available, so the data must be deleted
		setIsLogin(false)
	}
	const register = async ({
		firstName,
		lastName,
		email,
		password,
	}: RegisterUserRequest) => {
		// userMutation.mutate({ firstName, lastName, email, password })
	}
	const value = useMemo(
		() => ({
			user: userStatus === 'success' ? user : defaultUser,
			setIsLogin,
			isLogin,
			login,
			logout,
			register,
			userStatus,
		}),
		[user, isLogin, setIsLogin, login, logout, register, userStatus],
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
