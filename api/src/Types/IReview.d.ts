// Generated by https://quicktype.io

export type IReview = {
	_id: string
	comment: string
	rating: number
	product: string
	user: User
	__v: number
}

interface User {
	name: Name
	_id: string
}

interface Name {
	first: string
	last: string
}
