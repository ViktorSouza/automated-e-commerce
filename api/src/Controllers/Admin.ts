import { RequestHandler } from 'express'
import { Order, Product, Review, User } from '../Models'

const getAllAdminInfos: RequestHandler = async (req, res) => {
	const users = await User.countDocuments().exec()
	const reviews = await Review.countDocuments().exec()
	const products = await Product.countDocuments().exec()
	const orders = await Order.countDocuments().exec()

	res.json({
		infos: [
			{
				title: 'Number of users',
				value: users,
			},
			{
				title: 'Total Reviews',
				value: reviews,
			},
			{
				title: 'Total Products',
				value: products,
			},
			{
				title: 'Total Orders',
				value: orders,
			},
		],
	})
}
export default { getAllAdminInfos }
