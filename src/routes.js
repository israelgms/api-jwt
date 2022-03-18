import { Router } from "express"

import HelloController from "./controllers/HelloController.js";
import SessionsController from "./controllers/SessionsController.js";
import UsersController from "./controllers/UsersController.js";
import auth from "./middlewares/auth.js"

const routes = new Router();

routes.post('/sessions', SessionsController.create)
routes.post('/check', SessionsController.verify)
routes.get('/hello', HelloController.index)


routes.get('/users', auth, UsersController.index)
routes.get('/users/:id', auth, UsersController.show)
routes.post('/users', auth, UsersController.create)
routes.put('/users/:id', auth, UsersController.update)
routes.delete('/users/:id', auth, UsersController.destroy)

export default routes;