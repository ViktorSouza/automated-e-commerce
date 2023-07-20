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
	let actualPage = Number(currentPage)
	console.log(totalPages)

	return (
		<div className='flex  my-10 rounded  text-2xl justify-between  items-center w-full'>
			<div className='flex justify-start gap-8 items-center '>
				<button
					className='px-6 py-2'
					onClick={() => setCurrentPage(0)}>
					<i className='bi bi-chevron-double-left'></i>
				</button>
				<button
					className='px-6 py-2'
					onClick={() => setCurrentPage(Math.max(actualPage - 1, 0))}>
					<i className='bi bi-chevron-left'></i>
				</button>

				<i
					className='bi bi-three-dots'
					style={{
						visibility:
							Math.min(siblingCount, actualPage) == actualPage
								? 'hidden'
								: 'visible',
					}}></i>
			</div>
			<div className='flex items-center justify-around w-full'>
				{array(Math.min(siblingCount, actualPage))
					.map((value, index) => (
						<button
							className='px-6 py-2 text-base'
							key={index}
							onClick={() => setCurrentPage(actualPage - index - 1)}>
							{actualPage - index}
						</button>
					))
					.reverse()}
			</div>
			<span className='px-10 justify-self-center font-medium'>
				{actualPage + 1}
			</span>
			<div className='flex items-center justify-around w-full'>
				{array(Math.min(siblingCount, totalPages - actualPage - 1)).map(
					(value, index) => (
						<button
							key={index}
							className='px-6 py-2 text-base'
							onClick={() => setCurrentPage(index + actualPage + 1)}>
							{index + actualPage + 2}
						</button>
					),
				)}
			</div>
			<div className='flex justify-end gap-8 items-center'>
				<i
					className='bi bi-three-dots'
					style={{
						visibility:
							Math.min(actualPage, totalPages - siblingCount + 1) ==
							totalPages - siblingCount + 1
								? 'hidden'
								: 'visible',
					}}></i>

				<button
					className='px-6 py-2'
					onClick={() => setCurrentPage(Math.min(actualPage + 1, totalPages))}>
					<i className='bi bi-chevron-right'></i>
				</button>
				<button
					className='px-6 py-2'
					onClick={() => setCurrentPage(totalPages - 1)}>
					<i className='bi bi-chevron-double-right'></i>
				</button>
			</div>
		</div>
	)
}
function array(number: number) {
	return Array(Math.max(number, 0)).fill('')
}
