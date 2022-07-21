import request from 'supertest';
import app from '../../app';

it('should returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'mansour@foobar.agency',
      password: 'Mansour@1142',
    })
    .expect(201);
});

it('should returns a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'mansourfoobar.agency',
      password: 'Mansour@1142',
    })
    .expect(400);
});

it('should returns a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'mansour@foobar.agency',
      password: 'Mansour1142',
    })
    .expect(400);
});

it('should returns a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'mansour@foobar.agency',
    })
    .expect(400);
  return request(app)
    .post('/api/users/signup')
    .send({
      password: 'Mansour@1142',
    })
    .expect(400);
});

it('should disallows duplicated email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'mansour@foobar.agency',
      password: 'Mansour@1142',
    })
    .expect(201);

  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'mansour@foobar.agency',
      password: 'Mansour@1142',
    })
    .expect(400);
});

it('should sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'mansour@foobar.agency',
      password: 'Mansour@1142',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
