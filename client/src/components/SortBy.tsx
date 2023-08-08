'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'

export default function SortBy({
	sortOptions,
}: {
	sortOptions: { name: string; value: string }[]
}) {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const router = useRouter()
	function handleChange(value: string) {
		const searchParams1 = new URLSearchParams(searchParams?.toString())
		searchParams1.set('sort_by', value)
		const url = `${pathname}?${searchParams1}`
		router.replace(url)
	}
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='text-primary hover:bg-primary-foreground p-1 rounded-md'>
				Sort by
			</DropdownMenuTrigger>
			<DropdownMenuContent onChange={console.log}>
				{/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
				{/* <DropdownMenuSeparator /> */}
				{sortOptions.map((option) => (
					<DropdownMenuItem
						key={option.name}
						textValue={option.value}
						onSelect={() => handleChange(option.value)}>
						{option.name}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
