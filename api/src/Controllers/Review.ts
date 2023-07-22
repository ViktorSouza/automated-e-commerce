import { RequestHandler } from 'express'
import { MongooseError } from 'mongoose'
import { Product, Review } from '../models'
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

	const review = new Review({
		product,
		rating,
		comment,
		user: req.user._id,
	})
	try {
		await review.save()
	} catch (error) {
		if (error instanceof MongooseError) {
			throw new Error(error.name)
		}
		throw new Error('Server Internal Error')
	}
	res.json({ review })
}
const updateReview: RequestHandler = async (req, res) => {
	res.send('updateReview')
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
}
