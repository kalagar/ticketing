import { signinHelper } from '../../test/authHelper';
import request from 'supertest';
import app from '../../app';
import Order, { OrderStatus } from '../../models/order';
import { Ticket } from '../../models/ticket';

it('marks an order as cancelled', async () => {
  // Create a ticket with Ticket Model
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
  });
  await ticket.save();

  const user = signinHelper();

  // Make a request to build an order with this ticket
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  // Make a request to cancel the order
  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  const cancelledOrder = await Order.findById(order.id);

  // Expectation to make sure the thing is cancelled
  expect(cancelledOrder!.status).toEqual(OrderStatus.Cancelled);
});

it.todo('emits an order cancelled event');
