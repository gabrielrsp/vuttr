import Router from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ToolController from './app/controllers/ToolController';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateToolStore from './app/validators/ToolStore';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();


routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);
routes.put('/users', validateUserUpdate, UserController.update);

routes.get('/tools', ToolController.index);
routes.get('/tools/:id', ToolController.show);
routes.post('/tools', validateToolStore, ToolController.store);
routes.put('/tools/:id', ToolController.update)
routes.delete('/tools/:id', ToolController.delete)

export default routes;

