import React, { useEffect } from 'react'

export function Pagination({
	totalPages,
	currentPage,
	setCurrentPage,
}: {
	totalPages: number
	currentPage: number | string
	setCurrentPage: (old: number) => void
}) {
	let actualPage = Number(currentPage)
	return (
		<div className='flex my-10 rounded justify-between items-center'>
			<p className='dark:text-zinc-400'>
				{actualPage} of {Math.max(totalPages - 1, 0)} pages
			</p>
			<div className='space-x-3'>
				<button
					className='py-2 px-4 border text-zinc-900 dark:text-zinc-200 dark:border-zinc-900 rounded-md'
					onClick={() => setCurrentPage(Math.max(actualPage - 1, 0))}>
					Previous
				</button>
				<button
					className='py-2 px-4 border text-zinc-900 dark:text-zinc-200 dark:border-zinc-900 rounded-md'
					onClick={() =>
						setCurrentPage(Math.min(actualPage + 1, totalPages - 1))
					}>
					Next
				</button>
			</div>
		</div>
	)
}
