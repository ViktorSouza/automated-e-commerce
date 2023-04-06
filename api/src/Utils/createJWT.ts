import { Response } from 'express'
import JWT from 'jsonwebtoken'

export function createJWT({
	res,
	user,
}: {
	res: Response
	user: {
		toJSON: () => {}
	}
}) {
	//TODO afterward I'll make the "User" bigger, so you will need to remove some informations :D
	res.cookie('token', JWT.sign(user.toJSON(), process.env.SECRET), {
		signed: true,
	})
}
