import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductContext } from '../contexts/ProductContext'
import { UserContext } from '../contexts/UserContext'

function MainHeader() {
	const { isLogin } = useContext(UserContext)
	const { setSearchParams, searchParams } = useContext(ProductContext)
	function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
		console.log(searchParams)
		searchParams.set('search', e.target.value)
		setSearchParams(new URLSearchParams(searchParams.toString()))
	}
	return (
		<header className='w-12/12 border-b border-zinc-900 mb-5'>
			<div className='w-[1280px] mx-auto p-4 px-0 flex justify-between items-center'>
				<Link to='/'>
					<h1 className='text-xl font-medium'>Automated E-Commerce</h1>{' '}
				</Link>
				<div className='input hover:bg-zinc-800 transition duration-500 px-4'>
					<input
						type='text'
						defaultValue={searchParams.get('search') || ''}
						onChange={(e) => handleSearch(e)}
						name='product-search'
						id='product-seach'
						className='bg-transparent outline-none w-96'
					/>
					<button>
						<i className='bi bi-search'></i>
					</button>
				</div>
				{isLogin ? (
					<div className='flex justify-between gap-4 items-center'>
						<Link
							to='my-account/cart'
							className='hover:bg-zinc-900 py-1 px-2 border border-zinc-900 rounded-lg'>
							<i className='bi bi-bag text-1xl'></i>
						</Link>
						<div>
							<Link to='/my-account'>
								<h3>My Account</h3>
							</Link>
							<p className='text-xs text-zinc-400'>View Profile</p>
						</div>
					</div>
				) : (
					<div className='flex justify-between gap-3 items-stretch overflow-hidden'>
						<div className='hover:bg-zinc-900 py-1 px-2 border border-zinc-900 rounded-lg'>
							<i className='bi bi-person-circle text-2xl'></i>
						</div>
						<div>
							<Link
								to='/login'
								className='text-xs font-bold hover:underline'>
								Login
							</Link>
							<span className='text-xs'> or</span>
							<Link
								to='/create-account'
								className='text-xs font-bold hover:underline block'>
								Create account
							</Link>
						</div>
					</div>
				)}
			</div>
		</header>
	)
}
export default MainHeader
