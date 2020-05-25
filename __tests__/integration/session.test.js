import request from 'supertest';

import app from '../../src/app';
import factory from '../factories';

import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to create a session', async () => {

    const user = await factory.attrs('User');
    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/sessions')
      .send(user);

    expect(response.body).toHaveProperty('token');
  });

});
