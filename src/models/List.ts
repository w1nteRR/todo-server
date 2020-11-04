import mongoose, { Schema } from 'mongoose'

import { IList } from '../interfaces/models/IList'

const ListSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    todolist: {
        type: Array
    }
})

export default mongoose.model<IList & Document>('List', ListSchema)
