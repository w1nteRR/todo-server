import { Types } from 'joi'
import { Document, Schema } from 'mongoose'

import { ITask } from './ITask'

export interface IList extends Document {
    userId: any
    todolist: Array<object>
}