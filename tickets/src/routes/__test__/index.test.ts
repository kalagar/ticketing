import request from 'supertest';
import app from '../../app';
import { signinHelper } from '../../test/authHelper';

const createTicket = () => {
  return request(app).post('/api/tickets').set('Cookie', signinHelper()).send({
    title: 'Valid Title',
    price: 20,
  });
};

it('cat fetch a list of tickets', async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get('/api/tickets').send().expect(200);

  expect(response.body.length).toEqual(3);
});
