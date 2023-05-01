import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../contexts/ProductContext'
import { InputNumber } from './InputNumber'

export function ProductsFilter() {
	const [minValue, setMinValue] = useState<number>(0)
	//TODO change this
	const [maxValue, setMaxValue] = useState<number>(Number.MAX_SAFE_INTEGER)
	const { setSearchParams, searchParams } = useContext(ProductContext)

	useEffect(() => {
		searchParams.set('max_value', maxValue.toString())
		searchParams.set('min_value', minValue.toString())
		setSearchParams(new URLSearchParams(searchParams).toString())
	}, [maxValue, minValue])

	return (
		<div className='border rounded-md p-2 border-zinc-900 flex flex-col gap-5 self-start'>
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
					<span className='text-zinc-500'>--</span>
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
			<div>
				<h2 className='font-medium mb-2'>Condition</h2>
				<ul className='text-sm font-medium text-zinc-500'>
					<li>
						<button>
							<span>New</span> <span>(1292)</span>
						</button>
					</li>
					<li>
						<button>
							<span>Used</span> <span>(192)</span>
						</button>
					</li>
					<li>
						<button>
							<span>Reconditioned</span> <span>(22)</span>
						</button>
					</li>
				</ul>
			</div>

			<button className='border border-zinc-800 rounded-lg py-2 justify-self-center min-w-min'>
				Reset settings
			</button>
		</div>
	)
}
