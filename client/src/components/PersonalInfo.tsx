import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

export function PersonalInfo() {
	const { user } = useContext(UserContext)
	return (
		<div>
			<h2 className='text-h3 font-medium mb-5'>Personal Info</h2>
			<div>
				<div className='grid grid-cols-2 gap-3 w-full mb-5'>
					<div>
						<label htmlFor='first-name'>First Name</label>
						<input
							type='text'
							name='first-name'
							placeholder={user.name.first}
							id='first-name'
							className='input w-full'
						/>
					</div>
					<div>
						<label htmlFor='last-name'>Last Name</label>
						<input
							type='text'
							name='last-name'
							placeholder={user.name.last}
							id='last-name'
							className='input w-full'
						/>
					</div>
				</div>
				<div className='grid grid-cols-2 gap-3 w-full mb-5'>
					<div>
						<label htmlFor='old-password'>Old Password</label>
						<input
							type='password'
							name='old-password'
							id='old-password'
							className='input w-full'
						/>
					</div>
					<div>
						<label htmlFor='new-password'>New Password</label>
						<input
							type='password'
							name='new-password'
							id='new-password'
							className='input w-full'
						/>
					</div>
				</div>
				<div className='flex items-center gap-3 w-full bg-sky-500 rounded-lg py-2 px-4 justify-center'>
					<i className='bi bi-cloud-download'></i>
					<button>Apply Changes</button>
				</div>
			</div>
		</div>
	)
}
