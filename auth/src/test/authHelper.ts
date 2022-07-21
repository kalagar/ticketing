import app from '../app';
import request from 'supertest';

export const signinHelper = async () => {
  const email = 'mansour@foobar.agency';
  const password = 'Mansour@1142';

  await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password,
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email,
      password,
    })
    .expect(200);

  return response.get('Set-Cookie');
};
