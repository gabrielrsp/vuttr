import request from 'supertest';
import bcrypt from 'bcryptjs';

import app from '../../src/app';
import factory from '../factories';
import auth from '../util/auth';

import truncate from '../util/truncate';

let auth;

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to encrypt user password when new user is created', async () => {
    const user = await factory.create('User', {
      password: '123456'
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true)
  });

  it('should be able to register', async () => {
    const response = await request(app)
    .post('/users')
    .send({
      name: 'joao',
      email: 'joao@vuttr.com',
      password: '123456'
    });

    expect(response.body).toHaveProperty('id');
  });


  it('should not be able to register without name', async () => {
    const user = await factory.attrs('Auth');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });


  it('should not be able to register with duplicated email', async () => {
    const user = await factory.attrs('User');
    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });


  it('should not be able to update user with invalid token', async () => {
    const response = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${auth.token}`)

    expect(response.status).toBe(401);
  });


  it('should not be able to update user without token', async () => {
    const response = await request(app)
      .put('/users')

    expect(response.status).toBe(401);
  });


  it('should not be able to update user with an email that already exists', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'gabriel',
        email: 'gabriel@vuttr.com',
        password: '123456'
      });

    await request(app)
      .post('/users')
      .send({
        name: 'joao',
        email: 'joao@vuttr.com',
        password: '123456'
      });

    const res = await request(app)
      .post('/sessions')
      .send({
        email: 'joao@vuttr.com',
        password: '123456'
      });

    const response = await request(app)
      .put('/users')
      .send({
        email: 'gabriel@vuttr.com'
      })
      .set('Authorization', `Bearer ${res.body.token}`)

    expect(response.status).toBe(400);
  });



  it(`should not be able to update password without passing the old password correctly`, async () => {

    await request(app)
      .post('/users')
      .send({
        name: 'gabriel',
        email: 'gabriel@vuttr.com',
        password: '123456'
      });

    const res = await request(app)
      .post('/sessions')
      .send({
        email: 'gabriel@vuttr.com',
        password: '123456'
      });

    const response = await request(app)
      .put('/users')
      .send({
        oldPassword: '1234567',
        password: "654321",
        confirmPassword: "654321"
      })
      .set('Authorization', `Bearer ${res.body.token}`)

    expect(response.status).toBe(401);
  });


  it(`should be able to update user`, async () => {

    await request(app)
      .post('/users')
      .send({
        name: 'gabriel',
        email: 'gabriel@vuttr.com',
        password: '123456'
      });

    const res = await request(app)
      .post('/sessions')
      .send({
        email: 'gabriel@vuttr.com',
        password: '123456'
      });

    const response = await request(app)
      .put('/users')
      .send({
        name: 'Gabriel Rodrigues',
      })
      .set('Authorization', `Bearer ${res.body.token}`)

    expect(response.status).toBe(200);
  });


  it(`should not be able to update user with all empty fields`, async () => {

    await request(app)
      .post('/users')
      .send({
        name: 'gabriel',
        email: 'gabriel@vuttr.com',
        password: '123456'
      });

    const res = await request(app)
      .post('/sessions')
      .send({
        email: 'gabriel@vuttr.com',
        password: '123456'
      });

    const response = await request(app)
      .put('/users')
      .send({
        name: '',
        email: '',
        oldPassword: '',
        password: '',
        confirmPassword: ''
      })
      .set('Authorization', `Bearer ${res.body.token}`)

    expect(response.status).toBe(400);
  });


});
