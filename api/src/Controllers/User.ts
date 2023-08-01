import { RequestHandler } from 'express-serve-static-core'
import mongoose from 'mongoose'
import { User } from '../Models'

const showMe: RequestHandler = async (req, res) => {
	const user = await User.findOne({ _id: req.user._id })
		.populate('wishlist')
		.exec()

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
const addToWishlist: RequestHandler<
	{},
	{},
	{ product: mongoose.Types.ObjectId }
> = async (req, res) => {
	const { product } = req.body

	if (!mongoose.isValidObjectId(product)) throw new Error('Invalid ProductID')
	const user = await User.findOneAndUpdate(
		{ _id: req.user._id || '' },
		{
			$addToSet: {
				wishlist: product,
			},
		},
		{ new: true },
	).exec()
	console.log('triggering the wishlist')
	res.json({ user })
}
const removeFromWishlist: RequestHandler<
	{ id: string },
	{},
	{ product: mongoose.Types.ObjectId }
> = async (req, res) => {
	const { id: product } = req.params
	console.log('hey')

	if (!mongoose.isValidObjectId(product)) throw new Error('Invalid ProductID')

	const user = await User.findOneAndUpdate(
		{ _id: req.user._id || '' },
		{
			$pull: {
				wishlist: product,
			},
		},
		{ new: true },
	).exec()
	if (!user) throw new Error('????')
	res.json({ user: user.toJSON() })
}
export default {
	showMe,
	getAllUsers,
	getSingleUser,
	deleteUser,
	addToWishlist,
	removeFromWishlist,
}
