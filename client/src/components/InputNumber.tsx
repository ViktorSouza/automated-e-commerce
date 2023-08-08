'use client'
import React, { useEffect, useState } from 'react'
import { clsx } from 'clsx'

export const InputNumber = ({
	className,
	onChange = () => {},
	minValue = 0,
	maxValue = Number.MAX_SAFE_INTEGER,
	initialNumber,
	onClickIncrease,
	value,
	onClickDecrease,
	prefix = '',
}: {
	className?: string
	initialNumber?: number
	onChange?: (value: any) => any
	value?: number
	minValue?: number
	maxValue?: number
	prefix?: string

	onClickIncrease?: () => any
	onClickDecrease?: () => any
}) => {
	const [number, setNumber] = useState(initialNumber || 0)
	useEffect(() => {
		if (value) setNumber(value)
	}, [value])

	function increaseValue() {
		if (number >= maxValue) return
		onClickIncrease?.()
		if (!value) setNumber((current) => current + 1)
	}

	function decreaseValue() {
		if (number <= minValue) return
		onClickDecrease?.()
		if (!value) setNumber((current) => current - 1)
	}

	function changeValue(e: React.ChangeEvent<HTMLInputElement>) {
		const value = Number(e.target.value)
		if (value < 0) {
			return
		}
		onChange(value)
		setNumber(value)
		//TODO If the value changes, the onClickDecrease and onClickIncrease won't be affected
	}

	return (
		<div
			className={clsx(
				`flex flex-row p-2 rounded-lg placeholder:text-sm border dark:border-zinc-900 w-min justify-between items-center `,
				className,
			)}>
			<span>{prefix}</span>
			<input
				title='Number of products'
				type='number'
				min={minValue}
				max={maxValue}
				name='number-of-product'
				value={number}
				onChange={(e) => changeValue(e)}
				className='[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none bg-transparent py-0  w-10 text-sm'
				id='number-of-product'
			/>
			<div className='flex flex-col rounded overflow-hidden'>
				<button
					onClick={() => {
						increaseValue()
					}}
					className='dark:bg-zinc-900 bg-zinc-200 dark:hover:bg-zinc-700 hover:bg-zinc-300 px-1 dark:text-zinc-400 text-[8px]'>
					&#9650;
				</button>
				<button
					onClick={() => {
						decreaseValue()
					}}
					className='dark:bg-zinc-900 bg-zinc-200 hover:bg-zinc-300 dark:hover:bg-zinc-700 px-1 dark:text-zinc-400 text-[8px]'>
					&#9660;
				</button>
			</div>
		</div>
	)
}
