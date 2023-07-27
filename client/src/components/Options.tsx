import React, { useState } from 'react'

export function Options({
	options = [],
	title = '',
}: {
	options: { name: string; onClick: () => any }[]
	title: string
}) {
	const [isOpened, setIsOpened] = useState(false)
	return (
		<div className='relative text-zinc-900 dark:text-zinc-200'>
			<button
				className='p-2 rounded-lg border dark:border-zinc-900 flex justify-center gap-1 items-baseline'
				onClick={() => setIsOpened(!isOpened)}>
				{title}
				<i className={`bi bi-chevron-${isOpened ? 'up' : 'down'}`}></i>
			</button>
			{isOpened && (
				<div className='absolute z-20 bg-white shadow-md dark:shadow-none dark:bg-zinc-900 w-16 right-0 mt-3 rounded overflow-y-auto max-h-56 min-w-max flex flex-col items-stretch'>
					{options.map((option, index) => (
						<button
							key={option.name}
							onClick={option.onClick}
							className='dark:hover:bg-zinc-900 outline-none dark:focus:bg-zinc-900 hover:bg-zinc-100 focus:bg-zinc-100 transition-all py-2 px-4'>
							{option.name}
						</button>
					))}
				</div>
			)}
		</div>
	)
}
