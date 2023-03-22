import express from 'express'
import { Review } from '../Controllers/'
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
route.post('/', createReview)
route.patch('/', updateReview)
route.delete('/:id', deleteReview)
export { route as ReviewRouter }
