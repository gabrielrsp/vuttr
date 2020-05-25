
import request from 'supertest';
import factory from '../factories';

import app from '../../src/app';
import truncate from '../util/truncate';

export default async () => {

  await truncate();
  request(app)

  const user = await factory.attrs('User');
  await request(app)
    .post('/users')
    .send(user);

  const response = await request(app)
    .post('/sessions')
    .send(user);

  return { token: response.body.token }; // save the token!

}


