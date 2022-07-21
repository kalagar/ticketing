import request from 'supertest';
import app from '../../app';

it('should responds with a details about the current user', async () => {
  const authResponse = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'mansour@foobar.agency',
      password: 'Mansour@1142',
    })
    .expect(201);

  const cookie = authResponse.get('Set-Cookie');

  const response = await request(app)
    .get('/api/users/current')
    .set('Cookie', cookie)
    .send({
      email: 'mansour@foobar.agency',
      password: 'Mansour@1142',
    })
    .expect(200);

  expect(response.body.currentUser.email).toEqual('mansour@foobar.agency');
});

it('should responds with null if not authorized', async () => {
  const response = await request(app)
    .get('/api/users/current')
    .send()
    .expect(200);

  expect(response.body.currentUser).toBeNull();
});
