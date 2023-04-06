import mongoose from 'mongoose'
const Schema = new mongoose.Schema(
	{
		tax: {
			type: Number,
		},
		shippingFee: {
			type: Number,
		},
		subtotal: {
			type: Number,
		},
		total: {
			type: Number,
		},
		orderItems: {
			type: [],
		},
		status: {
			type: String,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		clientSecret: {
			type: String,
		},
		paymentId: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
)
const Order = mongoose.model('Order', Schema)
export { Order }
