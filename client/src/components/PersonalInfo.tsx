import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { useForm } from 'react-hook-form'

export function PersonalInfo() {
	const { user } = useContext(UserContext)
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<{ firstName: string; lastName: string }>({
		values: {
			firstName: '',
			lastName: '',
		},
	})
	return (
		<div>
			<h2 className='text-2xl font-medium mb-5 text-zinc-900 dark:text-zinc-200'>
				Personal Info
			</h2>
			<form>
				<div className='grid grid-cols-2 gap-3 w-full mb-5'>
					<div>
						<label htmlFor='first-name'>First Name</label>
						<input
							type='text'
							placeholder={user.name.first}
							{...register('firstName', {})}
							className='input  w-full'
							autoComplete='given-name'
						/>
					</div>
					<div>
						<label htmlFor='last-name'>Last Name</label>
						<input
							type='text'
							autoComplete='family-name'
							placeholder={user.name.last}
							{...register('lastName')}
							className='input  w-full'
						/>
					</div>
				</div>
				<div className='grid grid-cols-2 gap-3 w-full mb-5'>
					<div>
						<label htmlFor='current-password'>Old Password</label>
						<input
							type='password'
							autoComplete='current-password'
							name='current-password'
							id='current-password'
							className='input  w-full'
						/>
					</div>
					<div>
						<label htmlFor='new-password'>New Password</label>
						<input
							type='password'
							autoComplete='new-password'
							name='new-password'
							id='new-password'
							className='input  w-full'
						/>
					</div>
				</div>
				<button className='flex items-center gap-3 w-full bg-sky-500 rounded-lg py-2 px-4 text-zinc-50 justify-center'>
					<i className='bi bi-cloud-download'></i>
					Apply Changes
				</button>
			</form>
		</div>
	)
}
