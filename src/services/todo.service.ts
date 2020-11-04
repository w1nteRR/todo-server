import { Types } from 'mongoose'

import List from '../models/List'

import { ITodoAdd, ITodoDelete, ITodoEdit } from '../interfaces/todo/ITodo'
import { IToken } from '../interfaces/auth/IToken'

async function create (data: ITodoAdd) {
    try {
        
        const isExist = await List.find({
            userId: Types.ObjectId(data.userId),
            todolist: {
                $elemMatch: {
                    name: data.name
                }
            }
        })

        if(isExist.length) throw ('Task exists')

        await List.updateOne(
            {
                userId: Types.ObjectId(data.userId)
            },
            {
                $push: {
                    todolist: {
                        name: data.name,
                        _id: Types.ObjectId()
                    }
                }
            }
        )

    } catch (err) {
        throw err
    }
}

async function remove (data: ITodoDelete) {
    try {

        await List.updateOne(
            {
                userId: Types.ObjectId(data.userId)
            },
            {
                $pull: {
                    todolist: {
                        _id: Types.ObjectId(data._id)
                    }
                }
            }
        )

    } catch (err) {
        throw err
    }
}

async function edit (data: ITodoEdit) {
    try {

        await List.updateOne(
            {
                userId: Types.ObjectId(data.userId),
                'todolist._id': Types.ObjectId(data._id)
            },
            {
                $set: {
                    'todolist.$.name': data.name
                }
            }
        )

    } catch (err) {
        throw err
    }
}

async function getMy (data: IToken) {
    try {

        const res = await List.findOne({ userId: data.userId })

        return res?.todolist

    } catch (err) {
        throw err
    }
}

export default ({
    create,
    remove,
    edit,
    getMy  
})