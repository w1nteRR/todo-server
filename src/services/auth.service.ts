import bcrypt from 'bcrypt'
import { Types } from 'mongoose'
import { sign } from 'jsonwebtoken'

import User from '../models/User'
import List from '../models/List'

import { ISignInUser, ISignUpUser } from '../interfaces/auth/IAuth'

import { userSignUp, userSignIn } from '../utils/validation'

import { JWT } from '../config/env'

async function signup (candidate: ISignUpUser) {
    try {
        
        await userSignUp.validateAsync(candidate)

        const isUserExist = await User.findOne({
            email: candidate.email
        })

        if(isUserExist) throw ('User exists')

        const hash = await bcrypt.hash(candidate.password, 12)

        delete candidate.confirmPassword

        const user = new User({
            ...candidate,
            password: hash
        })

        await user.save()
        await new List({ userId: Types.ObjectId(user._id) }).save()

    } catch (err) {
        throw err
    }
}

async function signin (candidate: ISignInUser) {
    try {

        await userSignIn.validateAsync(candidate)
        
        const user = await User.findOne({
            email: candidate.email
        })

        if(!user) throw ('User not found')

        const checkPassword = await bcrypt.compare(candidate.password, user.password)

        if(!checkPassword) throw ('Wrong password')

        const token = sign({ userId: user._id }, JWT, { expiresIn: '7d' })

        return token
        

    } catch (err) {
        throw err
    }
}

export default ({
    signin,
    signup
})