import { Document, Types } from 'mongoose'
import { IProduct } from './IProduct'

export interface ICartItem {
	product: Types.ObjectId | string
	quantity: number
	price: number
}

export interface ICart {
	user: Types.ObjectId | string
	_id: Types.ObjectId | string
	products: ICartItem[]
	createdAt?: Date
	updatedAt?: Date
}
export type ICartPopulated = {
	products: { product: IProduct; quantity: number; price: number }[]
} & ICart
