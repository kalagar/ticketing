import {
  Listener,
  OrderCancelledEvent,
  Subjects,
} from '@klgr_ticketing/common';
import { Ticket } from '../../models/ticket';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { TicketUpdatedPublisher } from '../publisher/ticket-updated-publisher';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new Error('Ticket not found');
    }

    ticket.set({ orderId: undefined });
    await ticket.save();
    const { id, title, price, userId, version, orderId } = ticket;
    await new TicketUpdatedPublisher(this.client).publish({
      id,
      price,
      title,
      userId,
      version,
      orderId,
    });

    msg.ack();
  }
}
