import mongoose from 'mongoose'
const Schema = new mongoose.Schema({
	comment: {
		type: String,
		maxlength: 300,
	},
	stars: {
		type: Number,
		max: 5,
		min: 0,
	},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
})
Schema.index({ product: 1, user: 1 }, { unique: true })
const Review = mongoose.model('Review', Schema)

export { Review }
