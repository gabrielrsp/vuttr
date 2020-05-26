
import request from 'supertest';
import app from '../../src/app';
import truncate from '../util/truncate';

export default async () => {

  await truncate();

  await request(app)
  .post('/users')
  .send({
    name: 'maria',
    email: 'maria@vuttr.com',
    password: '123456'
  });

  const response = await request(app)
  .post('/sessions')
  .send({
    email: 'maria@vuttr.com',
    password: '123456'
  });

  return { token: response.body.token }; // save the token!

}


