import React, { useState } from 'react'

export function CEPInput() {
	const [inputValue, setInputValue] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let input = e.target.value
		// Remove any non-digit characters from the input value
		input = input.replace(/\D/g, '')
		// Format the input value as "00000-000"
		if (input.length <= 5) {
			setInputValue(input)
		} else if (input.length > 5 && input.length <= 8) {
			setInputValue(input.slice(0, 5) + '-' + input.slice(5))
		} else if (input.length > 8) {
			setInputValue(input.slice(0, 5) + '-' + input.slice(5, 8))
		}
	}
	return (
		<div className='flex flex-col gap-1'>
			<label
				htmlFor='cep'
				className='text-xs text-zinc-500 pl-1'>
				Consult your CEP
			</label>
			<div>
				<input
					type='text'
					name='cep'
					placeholder='0000-000'
					onChange={handleChange}
					value={inputValue}
					id='cep'
					title='Please enter a valid number pattern: 0000-000'
					className='border mr-2 dark:border-zinc-900 w-40 transition ease-in-out bg-transparent p-2 rounded-lg  outline-none'
				/>
				<button className='p-2 px-3 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-900 rounded-lg transition-all  dark:hover:bg-zinc-800 font-medium'>
					Ok
				</button>
			</div>
		</div>
	)
}
