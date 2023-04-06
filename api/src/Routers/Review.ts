import express from 'express'
import { Review } from '../Controllers/'
import { Authorization } from '../Middlewares'
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
