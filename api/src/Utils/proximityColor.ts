import validator from 'validator'
export function proximityColor({
	color,
	tolerance,
}: {
	color: `#${string}`
	tolerance: number
}) {
	if (!validator.isHexColor(color)) throw new Error('Invalid color')
}
