'use client'
import React from 'react'
import { addToWishlist, removeFromWishlist } from '../services/wishlist'
import { useRouter } from 'next/navigation'

export function AddToWishlist(props: { isWished: boolean; productId: string }) {
	const router = useRouter()
	return (
		<button
			className='text-primary' //TODO enable
			onClick={() => {
				props.isWished
					? removeFromWishlist({
							product: props.productId,
					  })
					: addToWishlist({
							product: props.productId,
					  })
				router.refresh()
			}}>
			<i
				className={`bi bi-heart${props.isWished ? '-fill' : ''} mr-2 ${
					props.isWished ? 'text-red-600' : 'dark:text-zinc-200'
				}`}></i>
			<span className=' font-semibold'>Wishlist</span>
		</button>
	)
}
