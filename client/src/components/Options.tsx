import React, { useState } from 'react'

export function Options({
	options = [],
	title = '',
}: {
	options: { name: string; onClick: () => any }[]
	title: string
}) {
	const [isOpened, setIsOpened] = useState(true)
	return (
		<div className='relative'>
			<button onClick={() => setIsOpened(!isOpened)}>
				<div className='input'>{title}</div>
			</button>
			{isOpened && (
				<div className='absolute z-10 bg-zinc-900 w-16 right-0 mt-3 rounded overflow-y-scroll max-h-56'>
					{options.map((option, index) => (
						<div
							key={option.name}
							onClick={() => {
								option.onClick()
								//TODO This sounds a little wrong
							}}
							className='hover:bg-zinc-800 py-1 px-2'>
							{option.name}
						</div>
					))}
				</div>
			)}
		</div>
	)
}
