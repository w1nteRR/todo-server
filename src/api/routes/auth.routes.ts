import { Router, Request, Response } from 'express'

import AuthService from '../../services/auth.service'

const router = Router()

export default (app: Router) => {
    app.use('/auth', router)

    router.post('/signup', async (req: Request, res: Response) => {
        try {

            await AuthService.signup(req.body)

            return res.status(200).json({
                message: 'Sign Up success'
            })

        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    })

    router.post('/signin', async (req: Request, res: Response) => {
        try {

            const token = await AuthService.signin(req.body)

            return res.status(200).json(token)

        } catch (err) {
            res.status(400).json(err)
        }
    })
}