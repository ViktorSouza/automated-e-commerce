import express from 'express'
const route = express.Router()
import { Admin } from '../Controllers'
const { getAllAdminInfos } = Admin
route.get('/', getAllAdminInfos)

export { route as AdminRouter }
