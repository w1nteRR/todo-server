import { Router } from 'express'

import AuthRouter from './routes/auth.routes'
import TodoRouter from './routes/todo.routes'
import FileRouter from './routes/file.routes'
import UserRouter from './routes/user.routes'


export default () => {
	
	const app = Router()

	AuthRouter(app)
	TodoRouter(app)
	FileRouter(app)
	UserRouter(app)

	return app
}
