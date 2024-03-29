import { RequestHandler } from 'express'
import Fuse from 'fuse.js'
import mongoose from 'mongoose'
import { Product, Review } from '../Models'
import { z } from 'zod'
const productSchema = z.object({
	title: z.string(),
	description: z.string(),
	price: z.string({ required_error: 'Please provide the price' }),
	colors: z.array(z.string()),
	image: z.string(),
})
/**======================
 **      Create Product
 * @route POST /products/
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
		price: Number(price),
		image,
		colors,
		user: req.user._id,
	})
	res.json({ product })
}

/**======================
 **      Get Products
 * @route GET /products/
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
		page_number = 0,
		page_size = 20,
		search = '',
		sort_by = 'title',
		max_value = Number.MAX_SAFE_INTEGER,
		min_value = 0,
		color = '',
	} = req.query
	search = z.string().parse(search)
	page_number = page_number?.toString()
	page_size = page_size?.toString()
	const page = parseInt(page_number || '0')
	const size = parseInt(page_size || '20')
	const skipIndex = page * size
	let query = /*  search
		? */ Product.find({
		price: { $gte: min_value, $lte: max_value },
		...(search && {
			$or: [
				{ title: { $regex: search, $options: 'i' } },
				{ description: { $regex: search, $options: 'i' } },
			],
		}),
	})

	let amount = await Product.countDocuments({
		price: { $gte: min_value, $lte: max_value },
		...(search && {
			$or: [
				{ title: { $regex: search, $options: 'i' } },
				{ description: { $regex: search, $options: 'i' } },
			],
		}),
	}).exec()
	let products = await query.sort(sort_by).skip(skipIndex).limit(size).exec()

	let totalPages = Math.ceil(amount / size)

	res.json({
		products: products,
		totalPages,
		currentPage: page,
		totalResults: products.length,
		amount,
	})
}

/**======================
 **      Get Reviews from a Product
 * @route GET /products/:id/reviews
 * @response {reviews:IReview[]}
 *========================**/
const getReviewsFromProduct: RequestHandler = async (req, res) => {
	const querySchema = z.object({
		page_number: z.string().optional(),
		page_size: z.string().optional(),
		sort_by: z.string().optional(),
	})
	let {
		page_number = '0',
		page_size = '20',
		sort_by = '-createdAt',
	} = querySchema.parse(req.query) ?? {}
	const page = parseInt(page_number || '0')
	const size = 20
	const { id } = req.params
	const skipIndex = page * size

	const reviews = await Review.find({ product: id })
		.sort(sort_by)
		.skip(skipIndex)
		.limit(size)
		.populate('user')
		.exec()

	let amount = await Review.countDocuments({ product: id }).exec()

	let totalPages = Math.ceil(amount / size)
	res.json({
		reviews,
		totalPages,
		currentPage: page,
		totalResults: reviews.length,
		amount,
	})
}

/**======================
 **      Get Single Product
 * @route GET /products/:id
 * @response {product:Iproduct, reviews?:IReview[]}
 *========================**/
const getSingleProduct: RequestHandler = async (req, res) => {
	const query = z
		.object({
			get_reviews: z
				.enum(['true', 'false'])
				.transform((value) => value === 'true'),
		}).partial()
		.parse(req.query)
	const { get_reviews } = query

	const { id } = req.params
	if (!mongoose.isValidObjectId(id)) throw new Error('Invalid ID')
	const product = await Product.findOne({ _id: id }).exec()
	if (!product) throw new Error('Product not found')
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
 * @route DELETE /products/:id
 * @response {message:'OK'}
 *========================**/
const deleteProduct: RequestHandler = async (req, res) => {
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
 * @route GET /products/AUTrandomProduct
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
 * @route GET /products/AUTrandomProduct
 * @response {products:IProduct[]}
 *========================**/
const getOwnProducts: RequestHandler = async (req, res) => {
	const products = await Product.find({ user: req.user._id }).exec()
	res.json({ products })
}

/**======================
 **      Update Product
 * @route PATCH /products/:id
 * @response {product:IProduct}
 *========================**/
const updateProduct: RequestHandler = async (req, res) => {
	if (!mongoose.isObjectIdOrHexString(req.params.id))
		throw new Error('Invalid ID')
	const body = productSchema.partial().strict('Invalid input').parse(req.body)

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
	getReviewsFromProduct,
}
