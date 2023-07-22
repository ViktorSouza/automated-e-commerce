'use client'
import { useEffect, useState } from 'react'

export function useTheme() {
	const [theme, setTheme] = useState<'dark' | 'light'>(
		(localStorage.getItem('theme') as 'dark' | 'light' | null) ?? 'dark',
	)
	useEffect(() => {
		theme === 'light'
			? document.documentElement.classList.remove('dark')
			: document.documentElement.classList.add('dark')
		document.cookie = `theme=${theme}`
		localStorage.setItem('theme', theme)
	}, [theme])
	return [theme, setTheme] as const
}
