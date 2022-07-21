import request from 'supertest';
import app from '../../app';
import { signinHelper } from '../../test/authHelper';

it('should fails when an email that does not exist is supplied', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'mansour@foobar.agency',
      password: 'Mansour@1142',
    })
    .expect(400);
});

it('should fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'mansour@foobar.agency',
      password: 'Mansour@1142',
    })
    .expect(201);

  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'mansour@foobar.agency',
      password: 'asdasd',
    })
    .expect(400);
});

it('should responds with a cookie when given valid credentials', async () => {
  const signinResponse = await signinHelper();

  expect(signinResponse).toBeDefined();
});
