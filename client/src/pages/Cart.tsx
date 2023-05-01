import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext'
import { InputNumber } from '../components/InputNumber'
import { updateCart } from '../services/cart'

export function Cart() {
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
			value: `${5}%` /* TODO it will be zero for a while */,
		},
	]
	return (
		<div className='flex gap-3'>
			<div className='w-full'>
				<div className='mb-5 px-2 grid-cols-8 grid gap-3 items-center justify-between text-sm font-medium text-zinc-300'>
					<p className='rounded-lg col-span-3 overflow-hidden '>Product</p>
					<p className='justify-self-center col-span-2'>Quantity</p>
					<p className='justify-self-end col-span-2'>Price</p>
				</div>
				<hr className='h-px my-4 border-0 bg-zinc-900' />
				{cart.products.map((item) => (
					<div
						key={item.product._id.toString()}
						className='mb-5  grid-cols-8 grid gap-3 items-center justify-between '>
						<div className='col-span-3 items-center flex gap-3'>
							<img
								className='rounded-lg'
								src={item.product.image}
								width={150}
							/>
							<Link
								to={`/product/${item.product._id}`}
								nonce={'yes'}>
								<h2 className='text-lg font-medium'>{item.product.title}</h2>
								{/* TODO add the color instead of quantity */}
								<span className='text-zinc-300 text-sm'>Color:</span>
								{/* <p>{item.color}</p> */}
								{/* <p>{item.quantity}</p> */}
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
						<button className='col-span-1 justify-self-center'>
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
			</div>
			<div className='border border-zinc-900 rounded-lg p-5 w-3/12 self-start'>
				<h1 className='font-semibold'>Summary</h1>
				<hr className='h-px my-4 border-0 bg-zinc-900' />
				<ul className='text-xs mb-5 space-y-2'>
					{list.map((info) => (
						<SummaryInfo
							info={info}
							key={info.title}
						/>
					))}
				</ul>
				<hr className='h-px my-4 border-0 bg-zinc-900' />
				<div className='flex justify-between my-4'>
					<h2 className='font-semibold'>Total: </h2>
					<h2 className='font-semibold'>$4930.99</h2>
				</div>
				<button className='bg-sky-500 w-full transition ease-in-out hover:bg-sky-400  px-10 p-2 rounded-lg'>
					Add to cart
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
