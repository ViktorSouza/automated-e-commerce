// import { Express } from 'express-serve-static-core'
import { ObjectId } from 'mongoose'
declare global {
	namespace Express {
		export interface Request {
			user: {
				name: {
					first: string
					last: string
				}
				email: string
				roles: string[]
				_id: ObjectId
			}
		}
	}
}
