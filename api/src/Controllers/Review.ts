import { RequestHandler } from 'express'
import { MongooseError } from 'mongoose'
import { Product, Review } from '../Models'
/**
 * @requires {
 *  comment:string
 *  rating:number
 *  product:string
 * }
 * @param req
 * @param res
 */
const createReview: RequestHandler = async (req, res) => {
	const { comment, rating, product } = req.body
	if (!product) throw new Error('No product provided')
	if (!rating) throw new Error('No rating provided')
	const productDB = await Product.findOne({ _id: product }).exec()
	if (!productDB) throw new Error('Product not found')

	const review = await Review.create({
		product,
		rating,
		comment,
		user: req.user._id,
	})
	// try {
	// 	await review.save()
	// } catch (error) {
	// 	if (error instanceof MongooseError) {
	// 		throw new Error(error.name)
	// 	}
	// 	throw new Error('Internal Server Error')
	// }
	res.json({ review })
}
const updateReview: RequestHandler = async (req, res) => {
	res.send('updateReview')
}
const likeReview: RequestHandler = async (req, res) => {
	let reviewExists = await Review.exists({ _id: req.params.id }).exec()
	if (!reviewExists)
		return res.status(404).json({ message: 'Product not found' })
	let review = await Review.findOneAndUpdate(
		{
			_id: req.params.id,

			'votes.user': {
				$ne: req.user._id,
			},
		},
		{
			$addToSet: {
				votes: {
					user: req.user._id,
					votedAt: new Date(Date.now()),
				},
			},
		},
		{ new: true },
	).exec()
	if (!review)
		return res.status(403).json({ message: "You've already liked this review" })
	res.json({ review })
}

const unlikeReview: RequestHandler = async (req, res) => {
	let reviewExists = await Review.exists({ _id: req.params.id }).exec()
	if (!reviewExists)
		return res.status(404).json({ message: 'Product not found' })

	let review = await Review.findOneAndUpdate(
		{
			_id: req.params.id,

			'votes.user': req.user._id,
		},
		{
			$unset: {
				votes: {
					user: req.user._id,
					votedAt: new Date(Date.now()),
				},
			},
		},
		{ new: true },
	).exec()
	if (!review)
		return res
			.status(403)
			.json({ message: 'You can not unlike a that you do not liked' })
	res.json({ review })
}

const deleteReview: RequestHandler = async (req, res) => {
	res.send('deleteReview')
}
const getAllReviews: RequestHandler = async (req, res) => {
	res.send('getAllReviews')
}
const getSingleReview: RequestHandler = async (req, res) => {
	res.send('getSingleReview')
}
export default {
	createReview,
	updateReview,
	deleteReview,
	getAllReviews,
	getSingleReview,
	likeReview,
	unlikeReview,
}
