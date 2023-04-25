import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

function MainHeader() {
	const { isLogin } = useContext(UserContext)
	console.log(isLogin)

	return (
		<header className='w-12/12 border-b border-slate-900 mb-5'>
			<div className='w-[1280px] mx-auto p-4 px-0 flex justify-between items-center'>
				<Link to='/'>
					<h1 className='text-xl font-medium'>Automated E-Commerce</h1>{' '}
				</Link>
				<div className='input hover:bg-slate-800 transition duration-500 px-4'>
					<input
						type='text'
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
							className='hover:bg-slate-900 py-1 px-2 border border-slate-900 rounded-lg'>
							<i className='bi bi-bag text-1xl'></i>
						</Link>
						<div>
							<Link to='/my-account'>
								<h3>My Account</h3>
							</Link>
							<p className='text-xs text-slate-400'>View Profile</p>
						</div>
					</div>
				) : (
					<div className='flex justify-between gap-3 items-stretch overflow-hidden'>
						<div className='hover:bg-slate-900 py-1 px-2 border border-slate-900 rounded-lg'>
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
