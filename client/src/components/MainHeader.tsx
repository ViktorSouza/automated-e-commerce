import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ProductContext } from '../contexts/ProductContext'
import { UserContext } from '../contexts/UserContext'
import ToggleTheme from './ToggleTheme'

function MainHeader() {
	const { isLogin } = useContext(UserContext)
	const location = useLocation()
	const { setSearchParams, searchParams } = useContext(ProductContext)
	function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
		console.log(searchParams)
		searchParams.set('search', e.target.value)
		setSearchParams(new URLSearchParams(searchParams.toString()))
	}
	return (
		<header className='mb-5 border-b w-12/12 dark:border-zinc-900'>
			<div className='xl:w-[1280px] w-full xl:mx-auto px-5 p-4 flex justify-between items-center'>
				<Link to='/'>
					<h1 className='md:text-xl font-medium text-zinc-900 dark:text-zinc-200'>
						Automated E-Commerce
					</h1>
				</Link>
				<div className='relative'>
					<button
						title='search'
						className='sm:hidden text-zinc-900 dark:text-zinc-200 peer'>
						<i className='bi bi-search'></i>
					</button>
					<div className='px-4 transition hidden peer-focus-within:flex sm:flex focus-within:flex hover:flex max-sm:left-1/2 max-sm:-translate-x-1/2 absolute sm:relative duration-500 input dark:hover:bg-zinc-800 hover:bg-zinc-200 bg-zinc-100 rounded-full'>
						<input
							type='text'
							disabled={location.pathname !== '/'}
							defaultValue={searchParams.get('search') ?? ''}
							onChange={(e) => handleSearch(e)}
							name='product-search'
							placeholder='Search for something...'
							id='product-seach'
							aria-label='Search'
							className='bg-transparent outline-none xl:w-96'
						/>
						<i className='bi bi-search'></i>
					</div>
				</div>

				<div className='flex gap-2 lg:gap-6 items-center'>
					<ToggleTheme />
					{isLogin ? (
						<>
							<Link
								to='my-account/cart'
								className='px-2 py-1 border rounded-lg dark:hover:bg-zinc-900 dark:border-zinc-900 text-zinc-900 dark:text-zinc-200'>
								<i className='bi bi-bag text-1xl'></i>
							</Link>
							<div className='sm:hidden'>
								<Link
									to='/my-account'
									className='px-2 py-1 aspect-square border rounded-lg dark:hover:bg-zinc-900 dark:border-zinc-900 text-zinc-900 dark:text-zinc-200'>
									<i className='bi bi-person'></i>
								</Link>
							</div>
							<div className='hidden sm:block'>
								<Link to='/my-account'>
									<h3 className='text-zinc-900 dark:text-zinc-200'>
										My Account
									</h3>
								</Link>
								<p className='text-xs dark:text-zinc-400'>View Profile</p>
							</div>
						</>
					) : (
						<div className='flex items-stretch justify-between gap-3 overflow-hidden'>
							<div>
								<Link
									to='/login'
									className='text-xs font-bold hover:underline text-zinc-900 dark:text-zinc-200'>
									Login
								</Link>
								<span className='text-xs'> or</span>
								<Link
									to='/create-account'
									className='block text-xs font-bold hover:underline text-zinc-900 dark:text-zinc-200'>
									Create account
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</header>
	)
}
export default MainHeader
