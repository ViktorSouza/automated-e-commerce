import { log } from 'console'
import { RequestHandler } from 'express-serve-static-core'
import { User } from '../Models'

const showMe: RequestHandler = async (req, res) => {
	const user = await User.findOne({ _id: req.user._id }).exec()

	if (!user) throw new Error('User not found ???????????????????')
	const newUser: { password?: string } = { ...user.toJSON() }
	delete newUser.password


	res.send({ user: newUser })
}
const getAllUsers: RequestHandler = async (req, res) => {
	const users = await User.find({}).exec()
	res.json(users)
}
const getSingleUser: RequestHandler = async (req, res) => {
	res.send('getSingleUser')
}
const deleteUser: RequestHandler = async (req, res) => {
	res.send('deleteUser')
}
export default { showMe, getAllUsers, getSingleUser, deleteUser }
