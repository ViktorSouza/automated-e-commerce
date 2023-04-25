import mongoose from 'mongoose'
import validator from 'validator'
import {IProduct} from 'shared/Types/IProduct'
const Schema = new mongoose.Schema<IProduct>({
	description: {
		required: false,
		type: String,
		default: '',
	},
	title: {
		requried: true,
		type: String,
	},
	image: {
		requried: false,
		type: String,
	},
	price: {
		required: true,
		type: Number,
	},
	user: {
		required: true,
		type: mongoose.Schema.Types.ObjectId,
	},
	averageRating: {
		type: Number,
		min: 0,
		max: 5,
	},
	numOfReviews: {
		type: Number,
	},
	colors: {
		required: true,
		type: [String],
		validation: {
			validate: validator.isHexColor,
		},
	},
})
const Product = mongoose.model('Product', Schema)
export { Product }

