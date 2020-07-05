import supertest from 'supertest';
import createServer, { context } from '../src/server';

const request = supertest(createServer());

afterAll(async (done) => {
  const { db } = await context();
  await db.reset();
  done();
});

describe('Create Post', () => {
  let postCreated = null;
  describe('Create Post - Initial', () => {
    test('Creating post should work', async (done) => {
      const res = await request
        .post('/graphql')
        .send({
          query: 'mutation { createPost(content: "Very beautiful"){ content date } }',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.data.createPost.content).toEqual('Very beautiful');
      postCreated = res.body.data.createPost;
      done();
    });

    test('Post count should be one after creating a post', async (done) => {
      const res = await request
        .post('/graphql')
        .send({
          query: '{ posts { content, date } }',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.data.posts.length).toEqual(1);
      done();
    });

    test('Get latest post should match the post created previously', async (done) => {
      const res = await request
        .post('/graphql')
        .send({
          query: '{ getLatestPost { content, date } }',
        })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200);

      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.data.getLatestPost).toStrictEqual(postCreated);
      done();
    });

    test('Previous posts should be empty after creating first post', async (done) => {
      const res = await request
        .post('/graphql')
        .send({
          query: '{ getPreviousPosts { content, date } }',
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
});
