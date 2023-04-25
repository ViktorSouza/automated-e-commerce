import { RequestHandler } from 'express'
import JWT from 'jsonwebtoken'
import { Cart, User } from '../Models'
import { createJWT } from '../Utils'

const registerUser: RequestHandler = async (req, res) => {
	const { name, email, password } = req.body as {
		name?: { first?: string; last?: string }
		email?: string
		password?: string
	}

	const roles: string[] = []

	if (!email) throw new Error('No email provided')
	if (!password) throw new Error('No password provided')
	if (!name?.first || !name.last) throw new Error('Incoplete name')

	if ((await User.countDocuments().exec()) === 0) {
		roles.push('Admin')
	} else {
		roles.push('User')
	}
	const user = await User.create({ email, password, name, roles })
	if (!user) throw new Error('Something goes wrong')
	const cart = await Cart.create({
		user: user._id,
	})
	createJWT({ res, user })
	res.json({ user })
}

const login: RequestHandler = async (req, res) => {
	const { email, password } = req.body as {
		email?: string
		password?: string
	}

	if (!email) throw new Error('No email provided')
	if (!password) throw new Error('No password provided')

	const user = await User.findOne({ email }).exec()

	if (!user) throw new Error('User not found')
	if (!user.comparePassword(password)) throw new Error('Invalid password')
	//TODO change this settings
	createJWT({ res, user })
	// res.cookie('token', JWT.sign(user.toJSON(), process.env.SECRET), {
	// 	signed: true,
	// 	// sameSite: 'none',
	// 	// domain:req.hostname,
	// 	// secure: true,
	// 	// httpOnly: true,
	// })
	res.json({ user })
}
const logout: RequestHandler = (req, res) => {
	res.clearCookie('token')
	res.json({ message: 'Ok' })
	console.log('Uepaaaaaa')
}
const AUTlogin: RequestHandler = async (req, res) => {
	const users = await User.find({
		roles: {
			$nin: ['admin'],
		},
	}).exec()
	const randomUser = users[Math.floor(Math.random() * users.length)]
	if (!randomUser) console.log('Ixi kkkkk')

	res.json({
		user: randomUser,
		token: JWT.sign(randomUser.toJSON(), process.env.SECRET),
	})
}
export default { registerUser, login, logout, AUTlogin }
