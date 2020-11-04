import { Router, Request, Response } from 'express'

import { verfiyToken } from '../../middlewares/auth/auth.middleware'

import UserService from '../../services/user.service'

import { IToken } from '../../interfaces/auth/IToken'

const router = Router()

export default (app: Router) => {
    app.use('/user', router)


    router.post('/me', verfiyToken, async (req: Request, res: Response) => {
        try {

            const { userId } = req.body as IToken

            const user = await UserService.me(userId)

            return res.status(200).json(user)

        } catch (err) {
            res.status(400).json(err)
        }
    })
}