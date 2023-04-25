import { Express } from 'express-serve-static-core'
import { ObjectId } from 'mongoose'
declare module 'express-serve-static-core' {
	interface Request {
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
