import { useContext, useEffect } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import ProductCard from '../components/ProductCard'
import { ProductContext } from '../contexts/ProductContext'
import { useQueryClient } from '@tanstack/react-query'
import { UserContext } from '../contexts/UserContext'
import { Pagination } from '../components/Pagination'
import { Options } from '../components/Options'
import { ProductsFilter } from '../components/ProductsFilter'
import { Filter, SlidersHorizontal } from 'lucide-react'

function MainPage() {
	const queryClient = useQueryClient()

	const {
		setSearchParams,
		searchParams,
		product,
		currentPage,
		setCurrentPage,
		productStatus,
	} = useContext(ProductContext)

	const { user } = useContext(UserContext)

	useEffect(() => {
		searchParams.set('page_number', currentPage.toString())
		setSearchParams(new URLSearchParams(searchParams.toString()))

		queryClient.refetchQueries({ queryKey: ['products', currentPage] })
	}, [product.totalPages, currentPage])
	if (productStatus === 'loading') return null
	function sortBy(by: string) {
		searchParams.set('sort_by', by)
		setSearchParams(new URLSearchParams(searchParams.toString()))
	}
	const sortOptions = [
		{
			name: 'Title',
			onClick() {
				sortBy('title')
			},
		},
		{
			name: 'Price',
			onClick() {
				sortBy('-price')
			},
		},
		{
			name: 'Most rated',
			onClick() {
				sortBy('-averageRating')
			},
		},
	]
	return (
		<>
			<main className='w-full'>
				<div className='sm:flex items-center justify-between'>
					<h1 className='py-4 font-semibold text-4xl text-primary'>Products</h1>
					<span className='justify-self-center'>{product.amount} results</span>
					<div className='flex gap-4 lg:mb-0 mb-5 items-center'>
						<Options
							options={sortOptions}
							title='Sort by'
						/>
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
										isWished={user.wishlist.some(
											(wish) => wish._id == product._id,
										)}
									/>
								)
							})}
						</div>
						<Pagination
							totalPages={product.totalPages}
							setCurrentPage={setCurrentPage}
							currentPage={currentPage}
						/>
					</div>
				</div>
			</main>
		</>
	)
}

export default MainPage

const randomStar = (): number => parseFloat((Math.random() * 5).toFixed(1))
