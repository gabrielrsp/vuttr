import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';
import auth from '../util/auth';

let auth

describe('Tool', () => {
  beforeEach(async () => {
    await truncate();
    auth = await auth();
  });

  it('should be able to list all tools on database', async () => {
    const response = await request(app)
      .get('/tools')
      .set('Authorization', `Bearer ${auth.token}`)

    expect(response.status).toBe(200);
  })

});
