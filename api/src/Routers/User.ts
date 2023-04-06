import express from 'express'
import { User } from '../Controllers'
import { Authorization } from '../Middlewares'
const router = express.Router()
const { deleteUser, getAllUsers, getSingleUser, showMe } = User
router.get('/showMe', Authorization({}), showMe)
router.delete('/:id', deleteUser)
router.get('/', getAllUsers)
router.get('/:id', getSingleUser)
export { router as UserRouter }
