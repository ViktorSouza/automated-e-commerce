import React, { useEffect, useState } from 'react'
import { Link, useSearchParams, Route, Routes } from 'react-router-dom'
import { getProducts } from '../services/product'
import ProductCard from '../components/ProductCard'

function MainPage() {
	let [searchParams, setSearchParams] = useSearchParams()
	const [products, setProducts] = useState<
		{
			_id: string
			description: string
			rating: number
			image?: string
			title: string
			price: number
			user: string
			colors: string[]
			__v: number
		}[]
	>([])
	const [totalPages, setTotalPages] = useState(1)
	const [currentPage, setCurrentPage] = useState(1)
	useEffect(() => {
		setSearchParams({ page_number: currentPage.toString() })
		getProducts(searchParams).then((data) => {
			console.log(data)
			setTotalPages(data.totalPages)
			setProducts(data.products)
		})
	}, [currentPage])
	return (
		<>
			<main>
				<div className='flex items-center justify-between'>
					<h1 className='text-h1 font-semibold py-4'>Products</h1>
					<ProductsOptions
						totalPages={totalPages}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
				</div>
				<div className='grid lg:grid-cols-3 2xl:grid-cols-4		 md:grid-cols-3  auto-cols-fr gap-12'>
					{products.map((product) => {
						// product.rating = randomStar()
						return (
							<ProductCard
								key={product._id}
								product={product}
							/>
						)
					})}
				</div>
			</main>
		</>
	)
}

export default MainPage

function ProductsOptions({
	totalPages,
	currentPage,
	setCurrentPage,
}: {
	totalPages: number
	currentPage: number
	setCurrentPage: (old: number) => void
}) {
	const [isOpened, setIsOpened] = useState(true)
	return (
		<div className='relative'>
			<button onClick={() => setIsOpened(!isOpened)}>
				<div className='input'>
					Page {currentPage} <i className='bi bi-chevron-down'></i>
				</div>
			</button>
			{isOpened && (
				<div className='absolute z-10 bg-slate-900 w-16 right-0 mt-3 rounded overflow-y-scroll max-h-56'>
					{Array(totalPages)
						.fill('')
						.map((_, index) => (
							<div
								key={index}
								onClick={() => {
									setCurrentPage(index)
									setIsOpened(false)
								}}
								className='hover:bg-slate-800 py-1 px-2'>
								{index}
							</div>
						))}
				</div>
			)}
		</div>
	)
}

const randomStar = (): number => parseFloat((Math.random() * 5).toFixed(1))
