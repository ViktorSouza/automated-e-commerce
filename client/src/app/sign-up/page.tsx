'use client'
import React, { useContext, useEffect, useRef } from 'react'
import { UserContext } from '../../contexts/UserContext'
import { useRouter } from 'next/navigation'

function CreateAccount() {
	const firstName = useRef<HTMLInputElement>(null)
	const lastName = useRef<HTMLInputElement>(null)
	const email = useRef<HTMLInputElement>(null)
	const password = useRef<HTMLInputElement>(null)
	const router = useRouter()
	const { register, isLogin, userStatus } = useContext(UserContext)

	useEffect(() => {
		if (isLogin) {
			router.push('/')
		}
	}, [isLogin])
	if (isLogin) return null

	function handleCreateAccount() {
		if (
			firstName.current &&
			lastName.current &&
			email.current &&
			password.current
		) {
			const errors = []
			if (!firstName.current.value) {
				errors.push('First name not provided')
			}
			if (!lastName.current.value) {
				errors.push('Last name not provided')
			}
			if (!email.current.value) {
				errors.push('Email not provided')
			}
			if (!password.current.value) {
				errors.push('Password not provided')
			}
			if (errors.length) {
				return
			}
			const data = {
				firstName: firstName.current.value,
				lastName: lastName.current.value,
				email: email.current.value,
				password: password.current.value,
			}
			register(data)
		}
	}
	return (
		<div className='flex flex-col w-full md:w-[500px] mx-auto rounded-md-lg md:p-10'>
			<h1 className='font-semibold text-4xl mb-4 text-primary'>Welcome!</h1>
			<div className='flex gap-3 justify-between mb-4'>
				<div>
					<label htmlFor='first-name'>First name</label>
					<input
						type='text'
						name='first-name'
						ref={firstName}
						id='first-name'
						placeholder='James'
						className='input w-full'
					/>
				</div>
				<div>
					<label htmlFor='last-name'>Last name</label>
					<input
						type='text'
						name='last-name'
						ref={lastName}
						id='last-name'
						placeholder='Webb'
						className='input w-full'
					/>
				</div>
			</div>
			<div className='mb-4'>
				<label htmlFor='email'>Email</label>
				<input
					type='text'
					className='input w-full'
					name='email'
					ref={email}
					id='email'
					placeholder='example@email.com'
				/>
			</div>
			<div className='mb-4'>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					name='password'
					ref={password}
					id='password'
					placeholder='************'
					className='input w-full'
				/>
			</div>
			<button
				className='bg-sky-500 hover:bg-sky-500 p-2 rounded-md text-white'
				onClick={handleCreateAccount}>
				Sign in
			</button>
		</div>
	)
}
export default CreateAccount
