import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';

import truncate from '../util/truncate';

describe('User', () => {

  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create a session', async () => {
    await request(app)
    .post('/users')
    .send({
      name: 'joao',
      email: 'joao@vuttr.com',
      password: '123456'
    });

    const response = await request(app)
    .post('/sessions')
    .send({
      email: 'joao@vuttr.com',
      password: '123456'
    });

    expect(response.body).toHaveProperty('token');
  });


  it('should not be able to create a session without password', async () => {
    await request(app)
    .post('/users')
    .send({
      name: 'joao',
      email: 'joao@vuttr.com',
      password: '123456'
    });

    const response = await request(app)
    .post('/sessions')
    .send({
      email: 'joao@vuttr.com',
    });

    expect(response.status).toBe(400);
  });


  it('should not be able to create a session with invalid credentials', async () => {
    const user = await factory.attrs('Auth');
    const response = await request(app)
      .post('/sessions')
      .send(user);
    expect(response.status).toBe(401);
  });


  it('should not be able to create a session with invalid password', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'gabriel',
        email: 'gabriel@vuttr.com',
        password: '123456'
      });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'gabriel@vuttr.com',
        password: '654321'
      });

    expect(response.status).toBe(401);
  });

});
