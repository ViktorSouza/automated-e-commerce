import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import ProductCard from '../components/ProductCard'
import { Pagination } from '../components/Pagination'
import { Options } from '../components/Options'
import { ProductsFilter } from '../components/ProductsFilter'
import { Filter, SlidersHorizontal } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { api } from '../services/api'
import { GetProductsResponse, getProducts } from '../services/product'
import { getUser } from '../services/user'
import SortBy from '../components/SortBy'
import { cookies } from 'next/headers'

const defaultProduct: GetProductsResponse = {
	amount: 0,
	totalResults: 0,
	totalPages: 0,
	currentPage: 0,
	products: [],
}
export default async function MainPage({
	searchParams,
	req,
}: {
	req: any
	searchParams: {}
}) {
	const product = await getProducts(searchParams)
	const user = await getUser()
	const sortOptions = [
		{
			name: 'Title',
			value: 'title',
		},
		{
			name: 'Price',
			value: '-price',
		},
		{
			name: 'Most rated',
			value: '-averageRating',
		},
	]
	return (
		<>
			<main className='w-full'>
				<div className='sm:flex items-center justify-between'>
					<h1 className='py-4 font-semibold text-4xl text-primary'>Products</h1>
					<span className='justify-self-center hidden md:inline'>
						{product.amount} results
					</span>
					<div className='flex gap-4 lg:mb-0 mb-5 items-center'>
						<span className='justify-self-center md:hidden'>
							{product.amount} results
						</span>
						<SortBy sortOptions={sortOptions} />
						<Dialog>
							<DialogTrigger className='text-primary hover:bg-primary-foreground p-1 rounded-md'>
								Filter Products{' '}
								<SlidersHorizontal
									size={16}
									strokeWidth={2}
									className='inline-block'
								/>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Filter Products</DialogTitle>
								</DialogHeader>
								<ProductsFilter />
							</DialogContent>
						</Dialog>
					</div>
				</div>
				<div className='grid grid-cols-5 gap-5'>
					{/* <ProductsFilter /> */}
					<div className='flex flex-col col-span-5'>
						<div className='grid gap-6 lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 auto-cols-fr'>
							{product.products.map((product) => {
								{
									/* {[].map((product) => { */
								}
								return (
									<ProductCard
										key={product._id}
										product={product}
										//TODO change here
										// isWished={false}
										isWished={
											user!.wishlist?.some((wish) => wish._id == product._id) ||
											false
										}
									/>
								)
							})}
						</div>
						<Pagination
							totalPages={product.totalPages}
							// setCurrentPage={setCurrentPage}
							currentPage={product.currentPage}
						/>
					</div>
				</div>
			</main>
		</>
	)
}

const randomStar = (): number => parseFloat((Math.random() * 5).toFixed(1))
