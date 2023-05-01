import { RequestHandler } from 'express'
import Fuse from 'fuse.js'
import mongoose from 'mongoose'
import { Product, Review } from '../Models'
import { z } from 'zod'
const productSchema = z.object({
	title: z.string(),
	description: z.string(),
	price: z
		.number({ required_error: 'Please provide the price' })
		.nonpositive('Provide a positive number'),
	colors: z.string(),
	image: z.string(),
})
/**======================
 **      Create Product
 * @route POST /product/
 * @requires {title:string,description:string,price:string, colors:string[],image:string}
 * @response {product:IProduct}
 *========================**/
const createProduct: RequestHandler = async (req, res) => {
	const { title, description, price, colors, image } = productSchema.parse(
		req.body,
	)
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
/**======================
 **      Create Product
 * @route GET /product/
 * @response {
		products: IProduct[],
		totalPages:number,
		currentPage: number,
		totalResults: number
	}
 */
const getAllProducts: RequestHandler<
	{},
	{},
	{},
	{
		page_number: string | number
		page_size: string | number
		search?: string
		sort_by: string
		min_value: string | number
		max_value: string | number
		color: string
	}
> = async (req, res) => {
	//page_number=2&page_size=20&facet_filters=&sort=most_searched
	let {
		page_number = 1,
		page_size = 20,
		search = '',
		sort_by = 'title',
		max_value = Number.MAX_SAFE_INTEGER,
		min_value = 0,
		color = '',
	} = req.query

	page_number = page_number?.toString()
	page_size = page_size?.toString()
	const page = parseInt(page_number || '1')
	const size = parseInt(page_size || '20')
	const skipIndex = (page - 1) * size
	let products = await Product.find({
		price: {
			$gte: min_value,
			$lte: max_value,
		},
	})
		.sort(sort_by)
		.skip(skipIndex)
		.limit(size)
		.exec()
	const count = await Product.countDocuments({
		//TODO something here
		// title: { $regex: search, $options: 'i' },
	}).exec()

	const fuse = new Fuse(products, {
		keys: ['title', 'description'],
		fieldNormWeight: 2,
		includeScore: false,
		distance: 150,
		shouldSort: true,
		threshold: 0.5,
	})

	let totalPages = Math.ceil(count / size)
	let results: any[] = []
	if (search) {
		results = fuse.search(search).map((pro) => pro.item)
		totalPages = Math.ceil(results.length / size)
	}

	res.json({
		products: search ? results : products,
		totalPages,
		currentPage: page,
		totalResults: search ? results.length : products.length,
	})
}

/**======================
 **      Get Single Product
 * @route GET /product/:id
 * @response {product:Iproduct, reviews?:IReview[]}
 *========================**/
const getSingleProduct: RequestHandler = async (req, res) => {
	//TODO use Zod to verify the req.query
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

/**======================
 **      Delete Product
 * @route DELETE /product/:id
 * @response {message:'OK'}
 *========================**/
const deleteProduct: RequestHandler = async (req, res) => {
	//TODO analyse this after
	const { id } = req.params
	if (!mongoose.isValidObjectId(id)) throw new Error('Invalid ID')

	const product = await Product.findOne({ _id: id }).exec()
	if (!product) throw new Error('Product not found')
	if (product.user !== req.user._id && !req.user.roles.includes('admin'))
		throw new Error("You cannot delete somebody's product")
	await product.delete()
	res.json({ message: 'OK' }).status(200)
}

/**======================
 **      Get Random Product
 * @route GET /product/AUTrandomProduct
 * @response {product:IProduct}
 *========================**/
const AUTgetRandomProduct: RequestHandler = async (req, res) => {
	const count = await Product.count().exec()
	const random = Math.floor(Math.random() * count)
	const product = await Product.findOne().skip(random).exec()
	res.json({ product })
}
/**======================
 **      Get Own Products
 * @route GET /product/AUTrandomProduct
 * @response {products:IProduct[]}
 *========================**/
const getOwnProducts: RequestHandler = async (req, res) => {
	const products = await Product.find({ user: req.user._id }).exec()
	res.json({ products })
}
/**======================
 **      Update Product
 * @route PATCH /product/:id
 * @response {product:IProduct}
 *========================**/
const updateProduct: RequestHandler = async (req, res) => {
	if (!mongoose.isObjectIdOrHexString(req.params.id))
		throw new Error('Invalid ID')
	const body = productSchema.partial().strict('Invalid input').parse(req.body)
	console.log('Ops :D')

	let product = await Product.findById(req.params.id).exec()

	if (!product) throw new Error('Invalid product')
	if (
		product.user.toString() !== req.user._id.toString() &&
		!req.user.roles.includes('Admin')
	) {
		throw new Error("You can't update the somebody's product")
	}

	product = await Product.findByIdAndUpdate(req.params.id, body, {
		new: true,
	}).exec()

	res.json({ product })
}
export default {
	updateProduct,
	AUTgetRandomProduct,
	createProduct,
	deleteProduct,
	getAllProducts,
	getSingleProduct,
	getOwnProducts,
}
