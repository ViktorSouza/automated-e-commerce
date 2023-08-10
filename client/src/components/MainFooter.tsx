import React from 'react'
import Link from 'next/link'

function MainFooter() {
	return (
		<footer className=' mb-10 mt-16 md:mt-32 grid grid-cols-2 gap-12 sm:grid-cols-3 md:gap-64'>
			<div>
				<h1 className='font-semibold mb-3 text-xl text-primary'>
					About the Project
				</h1>
				<ul className=' space-y-1'>
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
						<h2 className='font-medium text-primary'>Front-end</h2>
						<ul className='ml-5'>
							<li>React</li>
							<li>TypeScript</li>
							<li>Axios</li>
							<li>Shadcn/ui</li>
						</ul>
					</li>
					<li className=''>
						<h1 className='font-medium text-primary'>Back-end</h1>
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
				<h1 className='font-semibold mb-3 text-xl  text-primary'>Profile</h1>
				<ul className=' space-y-1'>
					<li className='dark:'>
						<Link
							className=' space-x-2'
							href={'/my-account'}>
							<i className='bi bi-person'></i>
							<span>My Account</span>
						</Link>
					</li>
					<li className='dark: '>
						<Link
							className='space-x-2'
							href='/my-account/cart'>
							<i className='bi bi-cart2'></i>
							<span>Cart</span>
						</Link>
					</li>
					<li className='dark: '>
						<Link
							className='space-x-2'
							href='/my-account/wishlist'>
							<i className='bi bi-heart'></i>
							<span>Wishlist</span>
						</Link>
					</li>
					<li className='dark: '>
						<Link
							className='space-x-2'
							href='/my-account/orders'>
							<i className='bi bi-file-text'></i>
							<span>Orders</span>
						</Link>
					</li>
				</ul>
			</div>
			<div>
				<h1 className='font-semibold mb-3 text-xl text-primary'>About me</h1>
				<ul className=' space-y-1'>
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
