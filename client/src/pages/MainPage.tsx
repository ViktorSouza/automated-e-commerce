import React, { useContext, useEffect } from 'react'
import { Link, useSearchParams, Route, Routes } from 'react-router-dom'
import { getProducts } from '../services/product'
import ProductCard from '../components/ProductCard'
import { ProductContext } from '../contexts/ProductContext'
import { useQueryClient } from '@tanstack/react-query'
import { UserContext } from '../contexts/UserContext'
import { ProductsFilter } from '../components/ProductsFilter'
import { Pagination } from '../components/Pagination'
import { Options } from '../components/Options'

function MainPage() {
	const queryClient = useQueryClient()

	const {
		setSearchParams,
		searchParams,
		product,
		currentPage,
		setCurrentPage,
		isProductsLoading,
		// totalPages,
		// setTotalPages,
	} = useContext(ProductContext)
	const { user } = useContext(UserContext)
	console.log('totalPages', product.totalPages)

	useEffect(() => {
		searchParams.set('page_number', currentPage.toString())
		setSearchParams(new URLSearchParams(searchParams.toString()))
		// setTotalPages(product.totalPages)

		queryClient.refetchQueries({ queryKey: ['products', currentPage] })
	}, [product.totalPages, currentPage])
	if (isProductsLoading) return null
	function sortBy(by: string) {
		searchParams.set('sort_by', by)
		setSearchParams(new URLSearchParams(searchParams.toString()))
	}
	const options = [
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
			<main className='mb-10'>
				<div className='flex items-center justify-between'>
					<h1 className='text-h1 font-semibold py-4'>Products</h1>
					<span>{product.totalPages} results</span>
				</div>
				<Options
					options={options}
					title='Sort by'
				/>
				<div className='grid grid-cols-5 gap-5'>
					<ProductsFilter />
					<div className='flex flex-col  col-span-4'>
						<div className='grid lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-3  auto-cols-fr gap-12 '>
							{product.products.map((product) => {
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
