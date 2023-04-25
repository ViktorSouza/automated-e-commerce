import { Response } from 'express'
import JWT from 'jsonwebtoken'
import { IUser } from 'shared/Types/IUser'

export function createJWT({
	res,
	user,
}: {
	res: Response
	user: {
		toJSON: () => {}
	} & IUser
}) {
	const { email, roles, name, _id } = user
	//TODO chage this settings
	res.cookie(
		'token',
		JWT.sign({ email, roles, name, _id }, process.env.SECRET),
		{
			signed: true,
			// sameSite: 'none',
			// secure: true,
			// httpOnly: true,
		},
	)
}
