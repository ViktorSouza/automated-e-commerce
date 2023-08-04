import { useTheme } from '../hooks/useTheme'

export default function ToggleTheme() {
	const [theme, setTheme] = useTheme()
	return (
		<button
			accessKey='t'
			className='text-primary  hover:bg-zinc-100 dark:hover:bg-zinc-900  aspect-square h-10 flex items-center justify-center rounded-full transition-colors'
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
					theme === 'dark' ? 'moon' : 'brightness-high text-primary'
				} `}></i>
		</button>
	)
}
