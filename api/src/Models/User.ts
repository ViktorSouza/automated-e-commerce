import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'
import validator from 'validator'
const Schema = new mongoose.Schema(
	{
		roles: {
			type: [String],
			required: true,
		},
		email: {
			type: String,
			// required: true,
			validate: {
				validator: validator.isEmail,
				message: 'Invalid email',
			},
		},
		password: {
			type: String,
			required: [true, 'Please provide a password'],
		},
		name: {
			first: {
				type: String,
				required: [true, 'Please provide your first name'],
				// minlength: 5,
				// maxLength: 50,
			},
			last: {
				type: String,
				required: [true, 'Please provide your last name'],
				// minlength: 5,
				// maxLength: 50,
			},
		},
	},
	{
		methods: {
			comparePassword(candidate) {
				return bcryptjs.compareSync(candidate, this.password)
			},
		},
	},
)
Schema.pre('save', function (next) {
	this.password = bcryptjs.hashSync(this.password, 10)
	next()
})
const User = mongoose.model('User', Schema)
export { User }
