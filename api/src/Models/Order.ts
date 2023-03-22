import mongoose from 'mongoose'
const Schema = new mongoose.Schema({})
const Order = mongoose.model('Order', Schema)
export { Order }
