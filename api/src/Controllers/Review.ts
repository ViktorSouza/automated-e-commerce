import { RequestHandler } from 'express'
import { Product, Review } from '../Models'
/**
 * @requires {
 *  comment:string
 *  stars:number
 *  product:string
 * }
 * @param req
 * @param res
 */
const createReview: RequestHandler = async (req, res) => {
	const { comment, stars, product } = req.body
	if (!product) throw new Error('No product provided')
	if (!stars) throw new Error('No stars provided')
	const productDB = await Product.findOne({ _id: product }).exec()
	if (!productDB) throw new Error('Product not found')
	console.log(req.user._id)

	const review = await Review.create({
		product,
		stars,
		comment,
		user: req.user._id,
	})
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
