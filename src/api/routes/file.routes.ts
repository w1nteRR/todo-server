import { Router, Request, Response } from 'express'
import multer, { memoryStorage } from 'multer'

import { IToken } from '../../interfaces/auth/IToken'
import { verfiyToken } from '../../middlewares/auth/auth.middleware'

import UploadService from '../../services/upload.service'
import UserService from '../../services/user.service'

const router = Router()

export default (app: Router) => {
    app.use('/file', router)

    const upload = multer({
        storage: memoryStorage()    
    }).single('file')

    router.post('/upload', verfiyToken, async (req: Request, res: Response) => {
        try {

            const { userId } = req.body as IToken

            upload(req, res, async (err: any) => {
                const url = await UploadService.uploadToGStorage(req, userId)

                await UserService.setImage(userId, url)

                return res.status(200).json({
                    mesasge: 'Image setup success'
                })
            })

        } catch (err) {
            res.status(400).json(err)
        }
    })
}