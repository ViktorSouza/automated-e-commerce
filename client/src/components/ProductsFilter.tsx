'use client'
import React, { useContext, useEffect, useState } from 'react'
import { InputNumber } from './InputNumber'
import { Slider } from '@/components/ui/slider'
import { cn } from '../lib/utils'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export function ProductsFilter({ className }: { className?: string }) {
	const [minValue, setMinValue] = useState<number>(0)
	const [maxValue, setMaxValue] = useState<number>(99999)
	const [range, setRange] = useState([0, 1000])
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const router = useRouter()

	useEffect(() => {
		const searchParams1 = new URLSearchParams(searchParams?.toString())
		searchParams1.set('max_value', maxValue.toString())
		searchParams1.set('min_value', minValue.toString())
		const url = `${pathname}?${searchParams1}`
		router.replace(url)
	}, [maxValue, minValue])

	return (
		<div
			className={cn(
				'rounded-md  dark:border-zinc-900 flex flex-col gap-5 self-start',
				className,
			)}>
			<div>
				<h2 className='font-medium mb-4 text-zinc-800 dark:text-zinc-200'>
					Price Range ({range[0]} ~ {range[1]})
				</h2>
				<Slider
					onValueChange={setRange}
					max={1000}
					onValueCommit={(value) => {
						setMinValue(value[0])
						setMaxValue(value[1])
					}}
					defaultValue={[0, 1000]}
					step={1}
				/>
			</div>
			<hr className='h-px my-2 border-0 bg-zinc-200 dark:bg-zinc-900' />
			<div>
				<h2 className='font-semibold mb-2 text-zinc-800 dark:text-zinc-200'>
					Condition
				</h2>
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

			<button
				className='border dark:border-zinc-900 rounded-lg py-2 justify-self-center min-w-min'
				onClick={() => {
					setMaxValue(1000)
					setMinValue(0)
					setRange([0, 1000])
				}}>
				Reset settings
			</button>
		</div>
	)
}
