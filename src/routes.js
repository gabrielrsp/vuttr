import Router from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ToolController from './app/controllers/ToolController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.get('/tools', ToolController.index);
routes.post('/tools', ToolController.store);
routes.delete('/tools/:id', ToolController.delete)




export default routes;

