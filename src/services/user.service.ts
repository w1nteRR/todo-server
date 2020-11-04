import { Types } from 'mongoose'

import User from '../models/User'

async function setImage (userId: string, url: string) {
    try {

        await User.updateOne(
            {
                _id: Types.ObjectId(userId)
            },
            {
                $set: {
                    img: url
                }
            }
        )

    } catch (err) {
        throw err
    }
}

async function me (userId: string) {
    try {

        return await User.findOne({ _id: Types.ObjectId(userId) }, { _id: 0, password: 0 })

    } catch (err) {
        throw err
    }
}

export default ({
    setImage,
    me
})