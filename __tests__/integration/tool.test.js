import request from 'supertest';

import factory from '../factories';
import app from '../../src/app';
import truncate from '../util/truncate';
import auth from '../util/auth';

let auth;

describe('Tool', () => {

  beforeAll(async () => {
    auth = await auth();
  });

  afterAll(async () => {
    setTimeout(() => process.exit(), 1000)
  });

  it('should be able to list all tools on database', async () => {
    const response = await request(app)
      .get('/tools')
      .set('Authorization', `Bearer ${auth.token}`)

    expect(response.status).toBe(200);
  });

  it('should be able to register a tool ', async () => {
    const tool = await factory.attrs('Tool');

    const response = await request(app)
      .post('/tools')
      .send(tool)
      .set('Authorization', `Bearer ${auth.token}`)

    expect(response.status).toBe(201);
  });

  it('should not be able to register a tool without a title ', async () => {
    const tool = await factory.attrs('Tool', { title: '' });

    const response = await request(app)
      .post('/tools')
      .send(tool)
      .set('Authorization', `Bearer ${auth.token}`)

    expect(response.status).toBe(400);
  });

  it('should be able to list all tools based on tag search', async () => {
    const tool = await factory.attrs('Tool', { title: '' });

    await request(app)
      .post('/tools')
      .send(tool)
      .set('Authorization', `Bearer ${auth.token}`)

    const response = await request(app)
      .get('/tools?tag=node')
      .set('Authorization', `Bearer ${auth.token}`)

    expect(response.status).toBe(200);
  });

  it('should be able to delete a tool given its id number', async () => {
    const tool = await factory.attrs('Tool');

    const resId = await request(app)
      .post('/tools')
      .send(tool)
      .set('Authorization', `Bearer ${auth.token}`)

    let id = resId.body.id

    const response = await request(app)
      .delete(`/tools/${id}`)
      .set('Authorization', `Bearer ${auth.token}`)

    expect(response.status).toBe(204);
  });

});


