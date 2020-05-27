
import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';

const token = async () => {

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

  return { token: response.body.token };

};

export default token;





