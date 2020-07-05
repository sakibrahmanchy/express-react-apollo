import supertest from 'supertest';
import createServer, { context } from '../src/server';

const request = supertest(createServer());

afterAll(async (done) => {
  const { db } = await context();
  await db.reset();
  done();
});

describe('Posts - Initial', () => {
  test('should not fetch any posts initially', async (done) => {
    const res = await request
      .post('/graphql')
      .send({
        query: '{ posts{ content } }',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.data.posts.length).toEqual(0);
    done();
  });

  test('Get latest post should return null', async (done) => {
    const res = await request
      .post('/graphql')
      .send({
        query: '{ getLatestPost { content } }',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.data.getLatestPost).toBe(null);
    done();
  });

  test('Get previous posts should return empty', async (done) => {
    const res = await request
      .post('/graphql')
      .send({
        query: '{ getPreviousPosts { content } }',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.data.getPreviousPosts).toStrictEqual([]);
    expect(res.body.data.getPreviousPosts.length).toEqual(0);
    done();
  });
});
