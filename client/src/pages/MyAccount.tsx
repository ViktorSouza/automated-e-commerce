import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate, Routes, Route, NavLink } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { PersonalInfo } from '../components/PersonalInfo'
import { Cart } from './Cart'
import { Wishlist } from './Wishlist'

function MyAccount() {
	const { user, logout, isLogin } = useContext(UserContext)
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
			action: logout,
			//TODO patch this
			to: 'logout',
		},
	]
	const [selected, setSelected] = useState(0)
	const navigate = useNavigate()

	console.log(user)
	useEffect(() => {
		if (!isLogin) navigate('/')
	})

	if (!isLogin) return null

	return (
		<div>
			<h1 className='text-h2 font-semibold mb-5'>Account</h1>
			<div className='flex flex-row gap-5 items-start'>
				<div className='flex flex-col border border-zinc-900 py-2 px-5 rounded-lg w-2/12'>
					<div className='flex flex-col items-center mb-4'>
						<div className='h-12 w-12 rounded-full bg-zinc-900 mb-3'></div>
						<p>
							{user.name.first} {user.name.last}
						</p>
						<p className='text-zinc-500 text-sm'>{user.email}</p>
					</div>
					<div className='flex flex-col'>
						{tabsData.map(({ icon, text, lineBreak, to, action }) => (
							<Fragment key={text}>
								<NavLink
									key={text}
									onClick={action}
									to={to}
									className={({ isActive }) =>
										`${
											isActive && !action && 'bg-sky-500'
										} gap-2 flex items-center py-2 px-4 rounded-lg`
									}>
									{
										<>
											<i className={icon}></i>
											<h2>{text}</h2>
										</>
									}
								</NavLink>
								{lineBreak && (
									<hr className='h-px my-4 border-0 bg-zinc-900'></hr>
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
function Orders() {
	return <>Orders</>
}
export default MyAccount
