import { RequestHandler } from 'express'
import mongoose from 'mongoose'
import { Product, Review } from '../Models'

const createProduct: RequestHandler = async (req, res) => {
	const { title, description, price, colors, image } = req.body as {
		title?: string
		image?: string
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
		image,
		colors,

		user: req.user._id,
	})
	res.json({ product })
}

const getAllProducts: RequestHandler = async (req, res) => {
	//page_number=2&page_size=20&facet_filters=&sort=most_searched
	console.log(req.query)

	let { page_number, page_size } = req.query
	page_number = page_number?.toString()
	page_size = page_size?.toString()
	const page = parseInt(page_number || '1')
	const size = parseInt(page_size || '20')
	const skipIndex = (page - 1) * size

	const products = await Product.find({}).skip(skipIndex).limit(size).exec()
	const count = await Product.countDocuments().exec()
	res.json({
		products,
		totalPages: Math.ceil(count / size),
		currentPage: page,
	})
}

const getSingleProduct: RequestHandler = async (req, res) => {
	const { get_reviews } = req.query
	const { id } = req.params
	if (!mongoose.isValidObjectId(id)) throw new Error('Invalid ID')
	const product = await Product.findOne({ _id: id }).exec()
	if (!product) throw new Error('Produt not found')
	let reviews
	if (get_reviews) {
		reviews = await Review.find({ product: id })
			.populate({ path: 'user', select: '_id name' })
			.exec()
	}

	res.json({ product, reviews })
}

const deleteProduct: RequestHandler = async (req, res) => {
	//#TODO analyse this after
	const { id } = req.params
	if (!mongoose.isValidObjectId(id)) throw new Error('Invalid ID')
	const product = await Product.findOne({ _id: id }).exec()
	if (!product) throw new Error('Product not found')
	if (product.user !== req.user._id && !req.user.roles.includes('admin'))
		throw new Error("You cannot delete somebody's product")
	await product.delete()
	res.send('Deleted')
}

const AUTgetRandomProduct: RequestHandler = async (req, res) => {
	const products = await Product.find({}).exec()
	if (!products) throw new Error('Sorry, no products created yet')
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
