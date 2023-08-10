'use client'
import React, { ReactNode } from 'react'
import MainHeader from './MainHeader'

//Contexts
import { UserProvider } from '../contexts/UserContext'
import { CartProvider } from '../contexts/CartContext'
import { Toaster } from 'react-hot-toast'
import MainFooter from './MainFooter'

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<React.StrictMode>
			<UserProvider>
				<CartProvider>
					<MainHeader />
					<div className='max-w-[1920px] w-full xl:w-[1280px] px-5 xl:mx-auto flex flex-col'>
						<Toaster />
						{children}
						<MainFooter />
					</div>
				</CartProvider>
			</UserProvider>
		</React.StrictMode>
	)
}
