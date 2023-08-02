import express from 'express'
import { Review } from '../Controllers'
import { Authorization } from '../Middlewares'
const {
	createReview,
	updateReview,
	deleteReview,
	getAllReviews,
	getSingleReview,
	likeReview,
	unlikeReview,
} = Review
const route = express.Router()
route.get('/', getAllReviews)
route.get('/:id', getSingleReview)
route.put('/:id/votes', Authorization({}), likeReview)
route.delete('/:id/votes', Authorization({}), unlikeReview)
route.post('/', Authorization({}), createReview)
route.patch('/', Authorization({}), updateReview)
route.delete('/:id', Authorization({}), deleteReview)
export { route as ReviewRouter }
