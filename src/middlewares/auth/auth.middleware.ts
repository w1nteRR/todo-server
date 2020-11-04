import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { JWT } from '../../config/env'

import { IToken } from '../../interfaces/auth/IToken'

export const verfiyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1]

    if(!token) return res.sendStatus(401)

    jwt.verify(token, JWT as string, (err, decoded) => {
        if(err) return res.sendStatus(401)
        
        const { userId } = decoded as IToken

        Object.assign(req.body, {
            userId
        })

        next()
    })   
}