import express from 'express'
import { Auth } from '../Controllers'
const router = express.Router()
const { registerUser, login, logout, AUTlogin } = Auth
router.post('/register', registerUser)
router.get('/logout', logout)
router.get('/login', login)
router.get('/AUTlogin', AUTlogin)
export { router as AuthRouter }
