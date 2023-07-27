import { useTheme } from '../hooks/useTheme'

export default function ToggleTheme() {
	const [theme, setTheme] = useTheme()
	return (
		<button
			accessKey='t'
			className='text-zinc-900 dark:text-zinc-200'
			type='button'
			onFocus={(e) => {
				e.preventDefault()
				e.target.focus({ preventScroll: true })
			}}
			autoFocus={false}
			onClick={() => {
				setTheme((current) => (current === 'light' ? 'dark' : 'light'))
			}}
			title='Toggle theme'>
			<i
				className={`bi bi-${
					theme === 'dark'
						? 'moon'
						: 'brightness-high text-zinc-900 dark:text-zinc-200'
				} `}></i>
		</button>
	)
}
