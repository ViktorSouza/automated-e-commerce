import { RequestHandler } from 'express'
import { Order, Product, Review, User } from '../Models'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_TOKEN ?? '', {
	apiVersion: '2022-11-15',
})

const getAllAdminInfos: RequestHandler = async (req, res) => {
	const users = await User.countDocuments().exec()
	const reviews = await Review.countDocuments().exec()
	const products = await Product.countDocuments().exec()
	const orders = await Order.countDocuments().exec()
	const newestProduct = await Product.findOne(
		{},
		{},
		{ sort: { _id: -1 } },
	).exec()
	const newestReview = await Review.findOne({}, {}, { sort: { _id: -1 } })
		.populate('user')
		.exec()
	const balance = await stripe.balance.retrieve()
	res.json({
		balance,
		newestProduct,
		newestReview,
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
