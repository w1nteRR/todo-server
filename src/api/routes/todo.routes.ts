import { Router, Request, Response } from 'express'

import { verfiyToken } from '../../middlewares/auth/auth.middleware'

import TodoService from '../../services/todo.service'

const router = Router()

export default (app: Router) => {
    app.use('/todo', router)

    router.post('/create', verfiyToken, async (req: Request, res: Response) => {
        try {

            await TodoService.create(req.body)
            
            return res.status(200).json({
                message: 'Success creation'
            })

        } catch (err) {
            res.status(400).json(err)
        }
    })

    router.post('/getMy', verfiyToken, async (req: Request, res: Response) => {
        try {

            const tasks = await TodoService.getMy(req.body)

            return res.status(200).json(tasks)

        } catch (err) {
            res.status(400).json(err)
        }
    })

    router.post('/remove', verfiyToken, async (req: Request, res: Response) => {
        try {

            await TodoService.remove(req.body)

            return res.status(200).json({
                message: 'Success delete'
            })

        } catch (err) {
            res.status(400).json(err)
        }
    })

    router.put('/edit', verfiyToken, async (req: Request, res: Response) => {
        try {

            await TodoService.edit(req.body)

            return res.status(200).json({
                message: 'Success update'
            })

        } catch (err) {
            res.status(400).json(err)
        }
    })
}