import mongoose, { Schema } from 'mongoose'

import { IUser } from '../interfaces/models/IUser'

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    }
})

export default mongoose.model<IUser & Document>('User', UserSchema)
