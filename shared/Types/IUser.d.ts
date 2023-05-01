import mongoose, { ObjectId } from 'mongoose'
import { ICart } from './ICart'
import { IProduct } from './IProduct'

export type IUser = {
	roles: string[]
	wishlist: IProduct[]
	_id: ObjectId | string
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
