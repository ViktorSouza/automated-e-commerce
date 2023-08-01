import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate, Routes, Route, NavLink } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { PersonalInfo } from '../components/PersonalInfo'
import { Cart } from './Cart'
import { Wishlist } from './Wishlist'
import { Orders } from './Orders'

function MyAccount() {
	const { user, logout, isLogin, userStatus } = useContext(UserContext)
	const tabsData = [
		{
			icon: 'bi bi-person',
			text: 'Personal info',
			// action: () => navigate('personal-info'),
			to: 'personal-info',
		},
		{
			icon: 'bi bi-cart',
			text: 'Cart',
			// action: () => navigate('cart'),
			to: 'cart',
		},
		{
			icon: 'bi bi-heart',
			text: 'Wishlist',
			// action: () => navigate('favorites'),
			to: 'wishlist',
		},
		{
			icon: 'bi bi-file-text',
			text: 'Orders',
			lineBreak: true,
			// action: () => navigate('orders'),
			to: 'orders',
		},
		{
			icon: 'bi bi-box-arrow-right',
			text: 'Logout',
			action: async () => {
				// navigate('/')
				await logout()
			},
			//TODO patch this
			to: '/',
		},
	]
	const navigate = useNavigate()

	useEffect(() => {
		if (!isLogin && userStatus == 'error') navigate('/')
	})

	if (!isLogin) return null

	return (
		<div>
			<h1 className='text-h2 font-semibold mb-5	text-zinc-900 dark:text-zinc-200'>
				Account
			</h1>
			<div className='flex flex-col lg:flex-row gap-5 items-start'>
				<div className='lg:flex flex-col lg:border dark:border-zinc-900 lg:py-2 lg:px-5 rounded-lg lg:w-3/12'>
					<div className='hidden lg:flex flex-col items-center mb-4'>
						<div className='h-12 w-12 rounded-full bg-zinc-900 mb-3'></div>
						<p className='text-zinc-900 dark:text-zinc-200'>
							{user.name.first} {user.name.last}
						</p>
						<p className='dark:text-zinc-500 text-sm'>{user.email}</p>
					</div>
					<div className='flex gap-6 lg:gap-0 lg:flex-col'>
						{tabsData.map(({ icon, text, lineBreak, to, action }) => (
							<Fragment key={text}>
								<NavLink
									key={text}
									onClick={action}
									to={to}
									className={({ isActive }) =>
										`${
											isActive &&
											!action &&
											'bg-zinc-200 dark:bg-zinc-900 sm:bg-sky-500 dark:text-inherit text-zinc-200'
										} gap-2 flex items-center md:py-2 md:px-4 px-2  rounded-lg text-zinc-900 dark:text-zinc-200`
									}>
									{
										<>
											<i className={icon}></i>
											<h2 className='hidden sm:inline'>{text}</h2>
										</>
									}
								</NavLink>
								{lineBreak && (
									<hr className='h-px my-4 border-0 bg-zinc-200 dark:bg-zinc-900'></hr>
								)}
							</Fragment>
						))}
					</div>
				</div>
				<div className='w-full'>
					<Routes>
						<Route
							path='/'
							element={<PersonalInfo />}
						/>
						<Route
							path='personal-info'
							element={<PersonalInfo />}
						/>
						<Route
							path='cart'
							element={<Cart />}
						/>
						<Route
							path='wishlist'
							element={<Wishlist />}
						/>
						<Route
							path='orders'
							element={<Orders />}
						/>
					</Routes>
				</div>
			</div>
		</div>
	)
}
export default MyAccount
