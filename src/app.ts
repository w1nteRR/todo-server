import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

import routers from './api/routers'

import { PORT, MONGO } from './config/env'

const app = express()

app.use(bodyParser.json())
app.use(routers())


const start = async () => {
    try {
        await mongoose.connect(MONGO), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }

        app.listen(PORT, () => console.log(`Server on ${PORT}`))

    } catch (err) {
        console.log(err)
    }
}

start()