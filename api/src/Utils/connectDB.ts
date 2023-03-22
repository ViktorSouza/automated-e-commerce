import mongoose from 'mongoose'

function connectDB(url: string) {
	mongoose.set('strictQuery', false)
	return mongoose.connect(url)
}

export { connectDB }
