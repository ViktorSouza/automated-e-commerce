import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

function Login() {
	const navigate = useNavigate()
	const { login, isLogin, userStatus } = useContext(UserContext)
	const email = useRef<HTMLInputElement>(null)
	const password = useRef<HTMLInputElement>(null)
	function handleLogin() {
		if (email.current && password.current) {
			const errors = []
			if (!email.current.value) {
				errors.push('Please provide the email')
			}
			if (!password.current.value) {
				errors.push('Please provide the password')
			}

			if (errors.length) return
			//TODO add pop up showing the errors :D

			login({ email: email.current.value, password: password.current.value })
		}
	}
	useEffect(() => {
		if (isLogin) {
			if (userStatus === 'loading') return
			navigate('/')
		}
	})
	console.log({ userStatus, isLogin })

	if (isLogin) return null
	if (userStatus === 'loading') return null
	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			className='flex flex-col md:w-[500px] mx-auto rounded-md-lg md:p-10'>
			<div className='mb-4'>
				<h1 className='font-semibold text-h1 text-zinc-900 dark:text-zinc-200'>
					Welcome back :D
				</h1>
			</div>
			<div className='mb-4'>
				<label htmlFor='email'>Email</label>
				<input
					className='input bg-zinc-100 w-full'
					type='text'
					name='username'
					autoComplete='username'
					ref={email}
					id='username'
					placeholder='example@email.com'
					required
				/>
			</div>
			<div className='mb-4'>
				<label htmlFor='password'>Password</label>
				<input
					className='input bg-zinc-100 w-full'
					type='password'
					name='password'
					autoComplete='current-password'
					defaultValue='123123'
					ref={password}
					placeholder='Type your password'
					id='password'
					required
				/>
			</div>
			<div className='flex flex-row justify-between content-between mb-4'>
				<Link
					to='/create-account'
					className='text-sky-500 hover:underline hover:text-sky-300'>
					Create account
				</Link>
				<Link
					to='/forget-password'
					className='text-sky-500 hover:underline hover:text-sky-300'>
					Forget the password?
				</Link>
			</div>
			<button
				className='bg-sky-500  p-2 rounded-md text-zinc-200'
				onClick={handleLogin}>
				Sign in
			</button>
		</form>
	)
}
export default Login
