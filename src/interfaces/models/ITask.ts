import { Document, Types } from 'mongoose'

export interface ITask extends Document {
    name: string
}