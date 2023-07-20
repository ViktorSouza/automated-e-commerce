import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../contexts/ProductContext'
import { InputNumber } from './InputNumber'

export function ProductsFilter() {
	const [minValue, setMinValue] = useState<number>(0)
	const [maxValue, setMaxValue] = useState<number>(99999)
	const { setSearchParams, searchParams } = useContext(ProductContext)

	useEffect(() => {
		searchParams.set('max_value', maxValue.toString())
		searchParams.set('min_value', minValue.toString())
		setSearchParams(new URLSearchParams(searchParams).toString())
	}, [maxValue, minValue])

	return (
		<div className='rounded-md p-2 px-4 dark:border-zinc-900 flex flex-col gap-5 self-start'>
			<div>
				<h2 className='font-medium mb-2'>Price Range</h2>
				<div className='flex items-center gap-2'>
					<InputNumber
						onChange={(value) => setMinValue(value)}
						prefix='$'
						initialNumber={minValue}
						onClickDecrease={() => setMinValue((curr) => curr - 1)}
						onClickIncrease={() => setMinValue((curr) => curr + 1)}
						minValue={0}
						maxValue={maxValue}
					/>
					<span className='dark:text-zinc-500'>-</span>
					<InputNumber
						onChange={(value) => setMaxValue(value)}
						suffix='$'
						onClickDecrease={() => setMaxValue((curr) => curr - 1)}
						onClickIncrease={() => setMaxValue((curr) => curr + 1)}
						initialNumber={maxValue}
						minValue={minValue}
						maxValue={10000}
					/>
				</div>
			</div>
			<hr className='h-px my-2 border-0 bg-zinc-900' />
			<div>
				<h2 className='font-semibold mb-2'>Condition</h2>
				<ul className='text-sm font-medium dark:text-zinc-500'>
					<li>
						<button onClick={() => {}}>
							<span>New</span> <span>(1292)</span>
						</button>
					</li>
					<li>
						<button onClick={() => {}}>
							<span>Used</span> <span>(192)</span>
						</button>
					</li>
					<li>
						<button onClick={() => {}}>
							<span>Reconditioned</span> <span>(22)</span>
						</button>
					</li>
				</ul>
			</div>

			<button className='border dark:border-zinc-800 rounded-lg py-2 justify-self-center min-w-min'>
				Reset settings
			</button>
		</div>
	)
}
