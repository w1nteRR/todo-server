import { Storage } from '@google-cloud/storage'
import path from 'path'

const key = path.join(__dirname, '../gcKey.json')

const storage = new Storage({
    keyFilename: key,
    projectId: 'navioffice-218223'
})

export default storage
