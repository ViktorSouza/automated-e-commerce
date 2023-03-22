import { RequestHandler } from 'express-serve-static-core'

const showMe: RequestHandler = async (req, res) => {
	res.send('showMe')
}
const getAllUsers: RequestHandler = async (req, res) => {
	res.send('getAllUsers')
}
const getSingleUser: RequestHandler = async (req, res) => {
	res.send('getSingleUser')
}
const deleteUser: RequestHandler = async (req, res) => {
	res.send('deleteUser')
}
export default { showMe, getAllUsers, getSingleUser, deleteUser }
