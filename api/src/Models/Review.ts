import mongoose from 'mongoose'
const Schema = new mongoose.Schema(
	{
		comment: {
			type: String,
			maxlength: 300,
		},
		rating: {
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
	},
	{
		timestamps: true,
		statics: {
			async calculateAverageRating(productId) {
				const result = await this.aggregate([
					{
						$match: {
							product: productId,
						},
					},
					{
						$group: {
							_id: null,
							averageRating: {
								$avg: '$rating',
							},
							numOfReviews: {
								$sum: 1,
							},
						},
					},
				]).exec()
				const { averageRating = 0, numOfReviews = 0 } = result[0] || {}
				await mongoose
					.model('Product')
					.findOneAndUpdate(
						{
							_id: productId,
						},
						{
							averageRating,
							numOfReviews,
						},
					)
					.exec()
			},
		},
	},
)
Schema.post('save', async function (doc) {
	//@ts-expect-error
	await this.constructor.calculateAverageRating(this.product)
})
Schema.post('remove', async function (doc) {
	//@ts-expect-error
	await this.constructor.calculateAverageRating(this.product)
})
Schema.index({ product: 1, user: 1 }, { unique: true })
const Review = mongoose.model('Review', Schema)

export { Review }
