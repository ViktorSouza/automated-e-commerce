import mongoose, { ObjectId } from 'mongoose'
import { ICart } from './ICart'

export type IUser = {
	roles: string[]
	_id: ObjectId
	email: string | undefined
	name: {
		first: string
		last: string
	}
}

export type RegisterUserRequest = {
	firstName: string
	lastName: string
	email: string
	password: string
}
