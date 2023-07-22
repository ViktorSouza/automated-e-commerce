import React from 'react'
import { Link } from 'react-router-dom'

function MainFooter() {
	return (
		<footer className='w-full mb-10 mt-32 flex gap-64'>
			<div>
				<h1 className='font-semibold mb-3 text-xl'>About the Project</h1>
				<ul className=' font-medium space-y-1'>
					<li className='dark: space-x-2'>
						<i className='bi bi-github'></i>
						{/* TODO put the link here */}
						<a
							target='_blank'
							className='space-x-2'>
							<span>GitHub repository</span>
						</a>
					</li>
					<li className='py-5'>
						Front-end
						<ul className='ml-5'>
							<li>React</li>
							<li>TanStack Query</li>
							<li>TypeScript</li>
							<li>Axios</li>
						</ul>
					</li>
					<li className=''>
						Back-end
						<ul className='ml-5'>
							<li>ExpressJS</li>
							<li>TypeScript</li>
							<li>Zod</li>
							<li>JsonWebToken</li>
							<li>Axios</li>
							<li>BCryptJS</li>
							<li>Stripe</li>
							<li>Mongoose</li>
							<li>Helmet</li>
						</ul>
					</li>
				</ul>
			</div>
			<div>
				<h1 className='font-semibold mb-3 text-xl'>Profile</h1>
				<ul className=' font-medium space-y-1'>
					<li className='dark:'>
						<Link
							className=' space-x-2'
							to={'/my-account'}>
							<i className='bi bi-person'></i>
							<span>My Account</span>
						</Link>
					</li>
					<li className='dark: '>
						<Link
							className='space-x-2'
							to='/my-account/cart'>
							<i className='bi bi-cart2'></i>
							<span>Cart</span>
						</Link>
					</li>
					<li className='dark: '>
						<Link
							className='space-x-2'
							to='/my-account/wishlist'>
							<i className='bi bi-heart'></i>
							<span>Wishlist</span>
						</Link>
					</li>
					<li className='dark: '>
						<Link
							className='space-x-2'
							to='/my-account/orders'>
							<i className='bi bi-file-text'></i>
							<span>Orders</span>
						</Link>
					</li>
				</ul>
			</div>
			<div>
				<h1 className='font-semibold mb-3 text-xl'>About me</h1>
				<ul className=' font-medium space-y-1'>
					<li className='dark:'>
						<a
							rel='noopener'
							className=' space-x-2'
							href='https://www.instagram.com/viktor.dzn/'
							target='_blank'>
							<i className='bi bi-instagram'></i>
							<span>Viktor.dzn</span>
						</a>
					</li>
					<li className='dark: '>
						<a
							rel='noopener'
							className='space-x-2'
							href='https://github.com/ViktorSouza/'
							target='_blank'>
							<i className='bi bi-github'></i>
							<span>ViktorSouza</span>
						</a>
					</li>
					<li className='dark: '>
						<a
							rel='noopener'
							className='space-x-2'
							href='https://wa.me/5516992891261'
							target='_blank'>
							<i className='bi bi-whatsapp'></i>
							<span>+55 16 9 9289-1261</span>
						</a>
					</li>
				</ul>
			</div>
		</footer>
	)
}

export default MainFooter
