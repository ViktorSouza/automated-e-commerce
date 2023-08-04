import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ProductContext } from '../contexts/ProductContext'
import { UserContext } from '../contexts/UserContext'
import ToggleTheme from './ToggleTheme'
import { Search, User2 } from 'lucide-react'

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
			<div className='xl:w-[1280px] w-full xl:mx-auto px-5 p-4 gap-5 flex justify-between items-center'>
				<Link
					to='/'
					className='shrink-0'>
					<h1 className='md:text-xl font-medium text-primary'>
						Automated E-Commerce
					</h1>
				</Link>
				<div className='relative  sm:w-full'>
					<button
						title='search'
						className='sm:hidden text-primary peer'>
						<i className='bi bi-search'></i>
					</button>
					<div className=' transition hidden peer-focus-within:flex sm:flex focus-within:flex hover:flex max-sm:fixed max-sm:w-screen max-sm:left-0 max-sm:top-16 sm:relative duration-500 input dark:hover:bg-zinc-800 hover:bg-zinc-100 bg-zinc-100 rounded-full sm:px-4 p-2 '>
						<input
							type='text'
							disabled={location.pathname !== '/'}
							defaultValue={searchParams.get('search') ?? ''}
							onChange={(e) => handleSearch(e)}
							name='product-search'
							placeholder='Search for something...'
							id='product-seach'
							aria-label='Search'
							className='bg-transparent outline-none w-full sm:p-0'
						/>
						<i className='bi text-primary bi-search sm:p-0'></i>
					</div>
				</div>

				<div className='flex gap-2  items-center shrink-0'>
					<ToggleTheme />
					{isLogin ? (
						<>
							<Link
								to='my-account/cart'
								className='px-2 py-1 transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 text-primary aspect-square h-10 flex items-center justify-center'>
								<i className='bi bi-bag'></i>
							</Link>
							<Link
								to='/my-account'
								className='px-2 py-1 transition-colors rounded-full  hover:bg-zinc-100 dark:hover:bg-zinc-900  text-primary aspect-square h-10 flex items-center justify-center'>
								<i className='bi bi-person'></i>
							</Link>
						</>
					) : (
						<div className='flex items-stretch justify-between gap-3 overflow-hidden'>
							<div>
								<Link
									to='/login'
									className='text-xs font-bold hover:underline text-primary'>
									Login
								</Link>
								<span className='text-xs'> or</span>
								<Link
									to='/create-account'
									className='block text-xs font-bold hover:underline text-primary'>
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
