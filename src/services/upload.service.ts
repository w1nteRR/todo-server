import { Request } from 'express'

import gstorage from '../config/storage/gcloud'

const bucket = gstorage.bucket('docode_test')

async function uploadToGStorage (req: Request, userId: string) {
    return new Promise<string>((resolve, reject) => {
        const { buffer, mimetype } = req.file
        
        const file = bucket.file(userId)

        const stream = file.createWriteStream({
            metadata: {
                contentType: mimetype
            },
            resumable: false
        })

        stream.on('error', err => reject(err))

        stream.on('finish', () => {
            const publicUrl = `https://storage.cloud.google.com/${bucket.name}/${file.name}`
            
            resolve(publicUrl)
        })

        stream.end(buffer)        
    })
}

export default ({
    uploadToGStorage
})