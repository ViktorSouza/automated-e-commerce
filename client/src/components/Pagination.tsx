import React, { useEffect } from 'react'

export function Pagination({
	totalPages,
	siblingCount = 2,
	currentPage,
	setCurrentPage,
}: {
	siblingCount: number
	totalPages: number
	currentPage: number | string
	setCurrentPage: (old: number) => void
}) {
	useEffect(() => {}, [])
	console.log(totalPages)

	return (
		<div className=' flex justify-between my-10 rounded  text-2xl items-center'>
			<button onClick={() => setCurrentPage(0)}>
				<i className='bi bi-chevron-left'></i>
			</button>
			{array(siblingCount)
				.map((value, index) => (
					<div
						className='text-base'
						key={index}
						onClick={() => setCurrentPage(Number(currentPage) - index - 1)}>
						{Number(currentPage) - index - 1}
					</div>
				))
				.reverse()}
			<span className='px-10'>{currentPage}</span>
			{array(siblingCount).map((value, index) => (
				<div
					key={index}
					className='text-base'
					onClick={() => setCurrentPage(index + Number(currentPage) + 1)}>
					{index + Number(currentPage) + 1}
				</div>
			))}
			<button onClick={() => setCurrentPage(totalPages)}>
				<i className='bi bi-chevron-right'></i>
			</button>
		</div>
	)
}
function array(number: number) {
	return Array(number).fill('')
}
