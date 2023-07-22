import { RequestHandler } from 'express-serve-static-core'
import JWT from 'jsonwebtoken'
import { ObjectId } from 'mongoose'

const Authorization = ({ roles }: { roles?: string[] }): RequestHandler => {
	return (req, res, next) => {
		if (!req.signedCookies.token && !req.cookies.token) {
			throw new Error('No token provided')
		}

		if (req.signedCookies.token) {
			req.user = JWT.verify(req.signedCookies.token, process.env.SECRET) as {
				name: {
					first: string
					last: string
				}
				roles: string[]
				email: string
				_id: ObjectId
			}
		} else {
			req.user = JWT.verify(req.cookies.token, process.env.SECRET) as {
				name: {
					first: string
					last: string
				}
				roles: string[]
				email: string
				_id: ObjectId
			}
		}
		if (roles && !req.user.roles.some((role) => roles.includes(role)))
			throw new Error('Negated Access')

		next()
	}
}
export default Authorization
