'use client'
import React from 'react'

function RatingStars({
	value,
	className,
}: {
	className?: string
	value: number
}) {
	return (
		<div className='shrink-0'>
			{Array(5)
				.fill('')
				.map((_s, index) => {
					let starType: '-fill' | '-half' | ''

					if (value >= index + 1) {
						starType = '-fill'
					} else if (value > index && value < index + 2) {
						starType = '-half'
					} else {
						starType = ''
					}

					return (
						<i
							key={index}
							className={`${className} bi bi-star${starType} pr-1 text-xs`}></i>
					)
				})}
		</div>
	)
}

export default RatingStars
