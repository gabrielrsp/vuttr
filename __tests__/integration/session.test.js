import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';
import truncate from '../util/truncate';

describe('User', () => {

  beforeEach(async () => {
    await truncate()
  });

  afterAll(async () => {
    setTimeout(() => process.exit(), 1000)
  });

  it('should be able to create a session', async () => {
    const user = await factory.attrs('User');
    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: user.password
      });

    expect(response.status).toBe(200);
  });

  it('should not be able to create a session without password', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'joao@vuttr.com',
      });

    expect(response.status).toBe(400);
  });

  it('should not be able to create a session with wrong password', async () => {
    const user = await factory.attrs('User');
    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: 'abcdef321'
      });

    expect(response.status).toBe(401);
  });

  it('should not be able to create a session with invalid credentials', async () => {
    const user = await factory.attrs('Auth');
    const response = await request(app)
      .post('/sessions')
      .send(user);
    expect(response.status).toBe(401);
  });

  it('should not be able to create a session with invalid password', async () => {
    const user = await factory.attrs('User');
    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '654321'
      });

    expect(response.status).toBe(401);
  });

});
