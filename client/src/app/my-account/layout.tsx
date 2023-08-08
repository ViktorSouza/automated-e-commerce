'use client'
import React, {
	Fragment,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from 'react'
import Link from 'next/link'
import { UserContext } from '../../contexts/UserContext'
import { useRouter } from 'next/router'
import { getUser, logoutUser } from '../../services/user'
import { redirect } from 'next/navigation'

function MyAccount({ children }: { children: ReactNode }) {
	const { user, logout, isLogin, userStatus } = useContext(UserContext)
	// const user = await getUser()
	// if (!user?._id) redirect('/')
	const tabsData = [
		{
			icon: 'bi bi-person',
			text: 'Personal info',
			to: '',
		},
		{
			icon: 'bi bi-cart',
			text: 'Cart',
			to: 'cart',
		},
		{
			icon: 'bi bi-heart',
			text: 'Wishlist',
			to: 'wishlist',
		},
		{
			icon: 'bi bi-file-text',
			text: 'Orders',
			lineBreak: true,
			to: 'orders',
		},
		{
			icon: 'bi bi-box-arrow-right',
			text: 'Logout',
			action: async () => {
				// navigate('/')
				await logoutUser()
			},
			//TODO patch this
			to: '/',
		},
	]

	return (
		<div>
			<h1 className='text-3xl font-semibold mb-5	text-primary'>Account</h1>
			<div className='flex flex-col lg:flex-row gap-5 items-start'>
				<div className='lg:flex flex-col lg:border dark:border-zinc-900 lg:py-2 lg:px-5 rounded-lg lg:w-3/12'>
					<div className='hidden lg:flex flex-col items-center mb-4'>
						<div className='h-12 w-12 rounded-full bg-zinc-900 mb-3'></div>
						<p className='text-primary'>
							{user.name.first} {user.name.last}
						</p>
						<p className='dark:text-zinc-500 text-sm'>{user.email}</p>
					</div>
					<div className='flex gap-6 lg:gap-0 lg:flex-col'>
						{tabsData.map(({ icon, text, lineBreak, to, action }) => (
							<Fragment key={text}>
								<Link
									key={text}
									onClick={action}
									href={`/my-account/${to}`}
									className={` gap-2 flex items-center md:py-2 md:px-4 px-2  rounded-lg text-primary`}>
									{
										<>
											<i className={icon}></i>
											<h2 className='hidden sm:inline'>{text}</h2>
										</>
									}
								</Link>
								{lineBreak && (
									<hr className='h-px my-4 border-0 bg-zinc-200 dark:bg-zinc-900'></hr>
								)}
							</Fragment>
						))}
					</div>
				</div>
				<div className='w-full'>{children}</div>
			</div>
		</div>
	)
}
export default MyAccount
