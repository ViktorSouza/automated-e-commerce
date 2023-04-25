import mongoose from 'mongoose'
import { ICart } from '../../../shared/Types/ICart'

const CartSchema = new mongoose.Schema<ICart>({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User', // Reference to User model for associating the cart with a user
		required: true,
	},
	products: {
		default: [],
		type: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Product', // Reference to Product model for associating the product with the cart
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
			},
		],
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
})

const Cart = mongoose.model('Cart', CartSchema)
export { Cart }
