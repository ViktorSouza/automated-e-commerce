import { RequestHandler } from 'express'
import JWT from 'jsonwebtoken'
import { User } from '../Models'
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
	}
	const user = await User.create({ email, password, name, roles })
	console.log('created Account')
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

	res.cookie('token', JWT.sign(user.toJSON(), process.env.SECRET), {
		signed: true,
	})
	res.json({ user })
}
const logout: RequestHandler = (req, res) => {
	res.clearCookie('token')
}
const AUTlogin: RequestHandler = async (req, res) => {
	console.log('AUTlogin')
	const users = await User.find({}).exec()
	const randomUser = users[Math.floor(Math.random() * users.length)]
	res.json({
		user: randomUser,
		token: JWT.sign(randomUser.toJSON(), process.env.SECRET),
	})
}
export default { registerUser, login, logout, AUTlogin }
