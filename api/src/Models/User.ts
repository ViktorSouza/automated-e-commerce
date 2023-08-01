import mongoose from 'mongoose'
import validator from 'validator'
import * as bcryptjs from 'bcryptjs'
import { IUser } from '../Types/IUser'
const Schema = new mongoose.Schema<
	IUser & { password: string; comparePassword: (candidate: string) => boolean }
>(
	{
		wishlist: {
			type: [],
			ref: 'Product',
			default: [],
		},
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
		timestamps: true,
		methods: {
			comparePassword(candidate) {
				return bcryptjs.compareSync(candidate, this.password)
			},
		},
	},
)
Schema.pre('save', function (next) {
	if (this.isModified('password')) {
		this.password = bcryptjs.hashSync(this.password, 10)
	}
	next()
})
const User = mongoose.model('User', Schema)

export { User }
