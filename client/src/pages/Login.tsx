import React, { useContext, useEffect, useRef, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { api } from '../services/api'
import { useQueryClient } from '@tanstack/react-query'

function Login() {
	const navigate = useNavigate()
	const { login, isLogin, userStatus, setIsLogin } = useContext(UserContext)
	const email = useRef<HTMLInputElement>(null)
	const password = useRef<HTMLInputElement>(null)
	const queryClient = useQueryClient()
	function handleRandomLogin() {
		api.post('/auth/AUTlogin').then((res) => {
			setIsLogin(true)
			queryClient.invalidateQueries(['user', 'cart'])
			queryClient.setQueryData(['user'], res.data.user)
		})
	}
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
			className='flex flex-col w-full md:w-[500px] mx-auto rounded-md-lg md:p-10'>
			<div className='mb-4'>
				<h1 className='font-semibold text-4xl text-primary'>Welcome back :D</h1>
			</div>
			<div className='mb-4'>
				<label htmlFor='email'>Email</label>
				<input
					className='input  w-full'
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
					className='input  w-full'
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
			<div className='flex flex-col gap-3'>
				<button
					className='bg-sky-500  p-2 rounded-md text-white'
					onClick={handleLogin}>
					Sign in
				</button>
				<span className='text-center'>or</span>
				<button
					type='button'
					className='dark:text-zinc-200 underline text-zinc-900 font-medium'
					onClick={handleRandomLogin}>
					Login with a random user
				</button>
			</div>
		</form>
	)
}
export default Login
