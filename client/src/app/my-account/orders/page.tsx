import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import React from 'react'
import { api } from '@/services/api'
import { IOrder } from 'shared/Types/IOrder'
import { cookies } from 'next/headers'
import Link from 'next/link'

export default async function Orders() {
	const cookieStore = cookies()
	api.get('/orders').catch(console.log)
	const data = (
		await api.get('/orders', {
			headers: { Cookie: `token=${cookieStore.get('token')?.value}` },
		})
	).data as {
		orders: IOrder[]
		totalPages: number
		currentPage: number
		totalResults: number
		amount: number
	}
	// console.log(data)
	return (
		<div>
			<h1 className='text-3xl font-semibold mb-5 	text-primary'>Orders</h1>
			<ul className='divide-y dark:divide-zinc-900  flex flex-col-reverse'>
				{data?.orders.map((order) => {
					return (
						<li key={order._id}>
							<Accordion
								type='single'
								collapsible>
								<AccordionItem
									value='item-1'
									className='grid grid-cols-4 justify-between p-3 gap-y-5'>
									<div>
										<h1 className='text-primary font-medium mb-3'>Status</h1>
										<span
											className={`${
												order.status === 'pendent'
													? 'text-amber-500'
													: 'text-green-500'
											}`}>
											{order.status}
										</span>
									</div>
									<div>
										<h1 className='text-primary font-medium mb-3'>Date</h1>
										<span>
											{new Date(order.createdAt).toLocaleDateString()}
										</span>
									</div>
									<div>
										<h1 className='text-primary font-medium mb-3'>Total</h1>
										<span>{order.total}</span>
									</div>
									<AccordionTrigger className='text-primary'>
										Details
									</AccordionTrigger>
									<AccordionContent className='col-span-4'>
										<div className='grid-cols-8 grid gap-3 items-center justify-between mb-5'>
											<div className='col-span-3  gap-3 font-medium text-primary'>
												Product
											</div>
											<p className='col-span-2 justify-self-end font-medium text-primary'>
												Price
											</p>
											<p className='col-span-2 justify-self-end font-medium text-primary'>
												Quantity
											</p>
										</div>
										{order.orderItems.map((item) => (
											<div
												key={item._id.toString()}
												className='grid-cols-8 grid gap-3 mb-5 items-center justify-between'>
												<div className='col-span-3 items-center flex gap-3'>
													<img
														alt={item.title}
														className='rounded-lg hidden sm:block'
														src={item.image}
														width={100}
													/>
													<Link
														href={`/product/${item._id}`}
														nonce={'yes'}>
														<h2 className='text-lg font-medium text-primary'>
															{item.title}
														</h2>
													</Link>
												</div>
												<p className='col-span-2 justify-self-end font-medium text-primary'>
													${item.price}
												</p>
												<p className='col-span-2 justify-self-end font-medium text-primary'>
													{item.quantity}
												</p>
											</div>
										))}
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
