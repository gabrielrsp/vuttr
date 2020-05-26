import request from 'supertest';

import app from '../../src/app';
import truncate from '../util/truncate';

describe('Tool', () => {

  beforeEach(async () => {
    await truncate();
  });

  afterEach(async () => {
    await truncate();
  });

  it('should be able to list all tools on database', async () => {

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
      .get('/tools')
      .set('Authorization', `Bearer ${res.body.token}`)

    expect(response.status).toBe(200);
  });


  it('should be able to register a tool ', async () => {
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
      .post('/tools')
      .send({
        title: 'hotel',
        link: 'https://github.com/typicode/hotel',
        description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy']
      })
      .set('Authorization', `Bearer ${res.body.token}`)

    expect(response.status).toBe(201);
  });



  it('should not be able to register a tool without a title ', async () => {
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
      .post('/tools')
      .send({
        link: 'https://github.com/typicode/hotel',
        description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy']
      })
      .set('Authorization', `Bearer ${res.body.token}`)

    expect(response.status).toBe(400);
  });


  it('should be able to list all tools based on tag search', async () => {

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

    await request(app)
      .post('/tools')
      .send({
        title: 'hotel',
        link: 'https://github.com/typicode/hotel',
        description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy']
      })
      .set('Authorization', `Bearer ${res.body.token}`)


    const response = await request(app)
      .get('/tools?tag=node')
      .set('Authorization', `Bearer ${res.body.token}`)

    expect(response.status).toBe(200);
  });


  it('should be able to delete a tool given its id number', async () => {

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

   const resId = await request(app)
      .post('/tools')
      .send({
        title: 'hotel',
        link: 'https://github.com/typicode/hotel',
        description: 'Local app manager. Start apps within your browser, developer tool with local .localhost domain and https out of the box.',
        tags: ['node', 'organizing', 'webapps', 'domain', 'developer', 'https', 'proxy']
      })
      .set('Authorization', `Bearer ${res.body.token}`)

    let id = resId.body.id

    const response = await request(app)
      .delete(`/tools/${id}`)
      .set('Authorization', `Bearer ${res.body.token}`)

    expect(response.status).toBe(204);
  });


});


