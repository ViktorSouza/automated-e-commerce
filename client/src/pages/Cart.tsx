import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext'
import { InputNumber } from '../components/InputNumber'
import { updateCart } from '../services/cart'
import { Pagination } from '../components/Pagination'

export function Cart() {
	const size = 10
	const [currentPage, setCurrentPage] = useState(0)
	const { cart, updateCart } = useContext(CartContext)
	const list = [
		{
			title: 'Subtotal',
			value: `$${cart.products
				.reduce((prev, curr, ind) => prev + curr.price * curr.quantity, 0)
				.toFixed(2)}`,
		},
		{
			title: 'Shipping Cost',
			value: `$${0}` /* TODO it will be zero for a while */,
		},
		{
			title: 'Tax',
			value: `${0}%` /* TODO it will be zero for a while */,
		},
	]

	return (
		<div className='flex gap-3'>
			<div className='w-full'>
				<div className='mb-5 px-2 grid-cols-8 grid gap-3 items-center justify-between text-sm font-medium dark:'>
					<p className='rounded-lg col-span-3 overflow-hidden '>Product</p>
					<p className='justify-self-center col-span-2'>Quantity</p>
					<p className='justify-self-end col-span-2'>Price</p>
				</div>
				<hr className='h-px my-4 border-0 bg-zinc-200 dark:bg-zinc-900' />
				{cart.products
					.slice(currentPage * size, currentPage * size + size)
					.map((item) => (
						<div
							key={item.product._id.toString()}
							className='mb-5  grid-cols-8 grid gap-3 items-center justify-between '>
							<div className='col-span-3 items-center flex gap-3'>
								<img
									alt={item.product.title}
									className='rounded-lg'
									src={item.product.image}
									width={150}
								/>
								<Link
									to={`/product/${item.product._id}`}
									nonce={'yes'}>
									<h2 className='text-lg font-medium'>{item.product.title}</h2>
									{/* TODO add the color instead of quantity */}
									<span className='dark: text-sm'>Color:</span>
									{/* TODO change this random */}
									<div
										className='w-8 h-8 rounded-lg'
										style={{
											background:
												item.product.colors[
													Math.floor(Math.random() * item.product.colors.length)
												],
										}}></div>
								</Link>
							</div>
							<InputNumber
								initialNumber={item.quantity}
								value={item.quantity}
								className='col-span-2 justify-self-center'
								onClickIncrease={() =>
									updateCart.mutate({
										product: item.product._id,
										quantity: item.quantity + 1,
									})
								}
								onClickDecrease={() =>
									updateCart.mutate({
										product: item.product._id,
										quantity: item.quantity - 1,
									})
								}
							/>
							<p className='col-span-2 justify-self-end font-medium'>
								${(item.price * item.quantity).toFixed(2)}
							</p>
							<button
								className='col-span-1 justify-self-center'
								title='Add or remove from cart'>
								<i
									className='bi bi-x text-xl'
									onClick={() => {
										updateCart.mutate({
											product: item.product._id,
										})
									}}></i>
							</button>
						</div>
					))}
				<Pagination
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalPages={Math.ceil(cart.products.length / size)}
				/>
			</div>
			<div className='border dark:border-zinc-900 rounded-lg p-5 w-3/12 self-start'>
				<h1 className='font-semibold'>Summary</h1>
				<hr className='h-px my-4 border-0 bg-zinc-200 dark:bg-zinc-900' />
				<ul className='text-xs mb-5 space-y-2'>
					{list.map((info) => (
						<SummaryInfo
							info={info}
							key={info.title}
						/>
					))}
				</ul>
				<hr className='h-px my-4 border-0 bg-zinc-200 dark:bg-zinc-900' />
				<div className='flex justify-between my-4'>
					<h2 className='font-semibold'>Total: </h2>
					<h2 className='font-semibold'>
						{cart.products.reduce(
							(prev, curr, index) => curr.price * curr.quantity + prev,
							0,
						)}
					</h2>
				</div>
				<button className='bg-sky-500 text-zinc-100 dark:text-zinc-950 w-full transition ease-in-out hover:bg-sky-400  px-10 p-2 rounded-lg'>
					Check out
				</button>
			</div>
		</div>
	)
}
function SummaryInfo({
	info,
}: {
	info: { title: string; value: number | string }
}) {
	return (
		<li className='flex justify-between'>
			<span className='font-medium'>{info.title}: </span>

			<span className='font-semibold'>{info.value}</span>
		</li>
	)
}
