import dotenv from 'dotenv'

const env = dotenv.config()

if(env.error) {
    throw new Error('No .env')
}

export const PORT = process.env.PORT || 8000
export const MONGO = process.env.MONGO || ''
export const JWT = process.env.JWT || ''