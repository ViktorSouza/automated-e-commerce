import React, { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

function CreateAccount() {
	const firstName = useRef<HTMLInputElement>(null)
	const lastName = useRef<HTMLInputElement>(null)
	const email = useRef<HTMLInputElement>(null)
	const password = useRef<HTMLInputElement>(null)
	const navigate = useNavigate()
	const { register, isLogin, isLoading } = useContext(UserContext)

	useEffect(() => {
		if (isLogin) {
			navigate('/')
		}
	}, [isLogin])
	if (isLogin || !isLoading) return null

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
				console.log(errors)
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
		<div className='flex flex-col w-[500px] mx-auto rounded-md-lg p-10'>
			<h1 className='font-semibold text-h1 mb-4'>Welcome!</h1>
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
				className='bg-sky-500 hover:bg-sky-500 p-2 rounded-md'
				onClick={handleCreateAccount}>
				Sign in
			</button>
		</div>
	)
}
// {
//     "name":{
//         "first":"João Viktor",
//         "last":"Souza"
//     },
//     "password":"123123",
//     "email":"viktor@gmail.com"
// }
export default CreateAccount
