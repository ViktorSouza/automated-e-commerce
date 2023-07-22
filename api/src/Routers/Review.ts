import express from 'express'
import { Review } from '../controllers'
import { Authorization } from '../middlewares'
const {
	createReview,
	updateReview,
	deleteReview,
	getAllReviews,
	getSingleReview,
} = Review
const route = express.Router()
route.get('/', getAllReviews)
route.get('/:id', getSingleReview)
route.post('/', Authorization({}), createReview)
route.patch('/', Authorization({}), updateReview)
route.delete('/:id', Authorization({}), deleteReview)
export { route as ReviewRouter }
