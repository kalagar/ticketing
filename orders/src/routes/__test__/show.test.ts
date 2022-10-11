import { Ticket } from '../../models/ticket';
import { generateId, signinHelper } from '../../test/authHelper';
import request from 'supertest';
import app from '../../app';

it('should fetches order', async () => {
  // Create three tickets
  const ticket = Ticket.build({
    id: generateId(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const user = signinHelper();
  // make request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);
  // Make request to get orders for User #2
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it('should returns an error if one user tries to fetch another user order', async () => {
  // Create three tickets
  const ticket = Ticket.build({
    id: generateId(),
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const user = signinHelper();
  // make request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);
  // Make request to get orders for User #2
  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', signinHelper())
    .send()
    .expect(401);
});
