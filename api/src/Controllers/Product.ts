import { RequestHandler } from 'express'
import mongoose from 'mongoose'
import { Product } from '../Models'

const createProduct: RequestHandler = async (req, res) => {
	const { title, description, price, colors } = req.body as {
		title?: string
		description?: string
		price?: string
		colors?: string[]
	}

	if (!title || !description || !price || !colors) {
		throw new Error('Provide all values')
	}
	const product = await Product.create({
		title,
		description,
		price,
		colors,

		user: req.user._id,
	})
	res.json({ product })
}

const getAllProducts: RequestHandler = async (req, res) => {
	const products = await Product.find({}).exec()

	res.json({ products })
}

const getSingleProduct: RequestHandler = async (req, res) => {
	const { id } = req.params
	if (!mongoose.isValidObjectId(id)) throw new Error('Invalid ID')
	const product = await Product.findOne({ _id: id })
	if (!product) throw new Error('Produt not found')
	res.json({ product })
}

const deleteProduct: RequestHandler = async (req, res) => {
	//#TODO security - only the product owner can delete the product
	const { id } = req.params
	if (!mongoose.isValidObjectId(id)) throw new Error('Invalid ID')
	const product = await Product.findOne({ _id: id })
	if (!product) throw new Error('Product not found')
	await product.delete()
	res.send('Deleted')
}

const AUTgetRandomProduct: RequestHandler = async (req, res) => {
	const products = await Product.find({}).exec()
	const randomProduct = products[Math.floor(products.length * Math.random())]
	res.json({ product: randomProduct })
}
export default {
	AUTgetRandomProduct,
	createProduct,
	deleteProduct,
	getAllProducts,
	getSingleProduct,
}
