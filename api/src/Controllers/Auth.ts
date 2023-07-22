import { RequestHandler } from 'express'
import * as JWT from 'jsonwebtoken'
import { z } from 'zod'
import { IUser } from '../types/IUser'
import { Cart, User } from '../models'
import { createJWT } from '../Utils'

//============================================REGISTER
const registerSchema = z.object({
	name: z.object({
		first: z
			.string()
			.max(255, 'First name is too long')
			.nonempty('First name is required'),
		last: z
			.string()
			.max(255, 'Last name is too long')
			.nonempty('Last name is required'),
	}),
	password: z
		.string()
		//TODO add this after
		// .regex(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/, 'Invalid password')
		.nonempty('Please provide an password'),
	email: z
		.string()
		.email('Invalid email')
		.nonempty('Please provide your email'),
})
/**
 *@request {email:string, name:string, password:string}
 *@response {user:IUser}
 */
const registerUser: RequestHandler<{}, { user: IUser }> = async (req, res) => {
	const body = registerSchema.parse(req.body)
	const { name, email, password } = body
	const roles: string[] = []

	if ((await User.countDocuments().exec()) === 0) {
		roles.push('admin')
	} else {
		roles.push('User')
	}
	const user = await User.create({ email, password, name, roles })
	if (!user) throw new Error('Something goes wrong')

	//Create the cart for user
	await Cart.create({
		user: user._id,
	})
	createJWT({ res, user })
	res.json({ user })
}

/**----------------------
 *    *Login
 *------------------------**/
const loginSchema = z.object({
	email: z.string().email('Invalid email').nonempty('No email provided'),
	password: z
		.string()
		//TODO add this after
		// .regex(/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/i, 'Invalid password')
		.nonempty('No password provided'),
})
/**
 * @route POST /auth/login
 * @request {email:string, password:string}
 * @response {user:IUser}
 */
const login: RequestHandler = async (req, res) => {
	const body = loginSchema.parse(req.body)
	const { email, password } = body

	if (!email) throw new Error('No email provided')
	if (!password) throw new Error('No password provided')

	const user = await User.findOne({ email }).exec()

	if (!user) throw new Error('User not found')
	if (!user.comparePassword(password)) throw new Error('Invalid password')
	createJWT({ res, user })
	res.json({ user })
}
/**======================
 *    *Logout
 *========================**/
/**
 * @route POST /auth/logout
 * @response {message:'OK'}
 */
const logout: RequestHandler<{}, { message: string }> = (req, res) => {
	res.clearCookie('token')
	res.json({ message: 'Ok' })
}
/**----------------------
 *    *Automatic Login
 *------------------------**/
/**
 *
 * @route POST /auth/AUTlogin
 * @response {user:IUser, token:JWToken}
 */
const AUTlogin: RequestHandler<{}, { user: IUser; token: string }> = async (
	req,
	res,
) => {
	const count = await User.count().exec()
	const random = Math.floor(Math.random() * count)
	const user = await User.findOne({
		roles: {
			$nin: ['admin'],
		},
	})
		.skip(random)
		.exec()
	if (!user) throw new Error('No users yet')

	createJWT({ res, user })
	res.json({
		user,
		token: JWT.sign(user.toJSON(), process.env.SECRET ?? ''),
	})
}
export default { registerUser, login, logout, AUTlogin }
