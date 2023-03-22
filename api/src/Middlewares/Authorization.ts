import { RequestHandler } from 'express-serve-static-core'
import JWT from 'jsonwebtoken'
import { ObjectId } from 'mongoose'

const Authorization: RequestHandler = (req, res, next) => {
	//TODO make the token verification

	if (!req.signedCookies.token && !req.cookies.token) {
		throw new Error('No token provided')
	}

	if (req.signedCookies.token) {
		req.user = JWT.verify(req.signedCookies.token, process.env.SECRET) as {
			name: {
				first: string
				last: string
			}
			email: string
			_id: ObjectId
		}
	} else {
		req.user = JWT.verify(req.cookies.token, process.env.SECRET) as {
			name: {
				first: string
				last: string
			}
			email: string
			_id: ObjectId
		}
	}
	next()
}
export default Authorization
