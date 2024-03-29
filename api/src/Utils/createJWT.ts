import { Response } from 'express'
import JWT from 'jsonwebtoken'
import { IUser } from '../Types/IUser'

type createJWTParams = {
	res: Response
	user: {
		toJSON: () => {}
	} & IUser
}

export function createJWT({ res, user }: createJWTParams) {
	const { email, roles, name, _id } = user
	res.cookie(
		'token',
		JWT.sign({ email, roles, name, _id }, process.env.SECRET ?? ''),
		{
			//TODO change this settings
			// signed: true,
			sameSite: 'none',
			secure: true,
			// httpOnly: true,
		},
	)
}
