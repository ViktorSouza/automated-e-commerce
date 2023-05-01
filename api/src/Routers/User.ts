import express from 'express'
import { User } from '../Controllers'
import { Authorization } from '../Middlewares'
const router = express.Router()
const {
	deleteUser,
	getAllUsers,
	getSingleUser,
	showMe,
	addToWishlist,
	removeFromWishlist,
} = User
router.get('/showMe', Authorization({}), showMe)
router.post('/wishlist', Authorization({}), addToWishlist)
router.delete('/wishlist/:id', Authorization({}), removeFromWishlist)
router.get('/', getAllUsers)
router.delete('/:id', deleteUser)
router.get('/:id', getSingleUser)
export { router as UserRouter }
