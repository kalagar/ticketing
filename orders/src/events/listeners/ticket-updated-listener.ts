import {
  Listener,
  NotFoundError,
  Subjects,
  TicketUpdatedEvent,
} from '@klgr_ticketing/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findOne({
      _id: data.id,
      version: data.version - 1,
    });

    if (!ticket) {
      throw new NotFoundError('Ticket not found');
    }

    const { title, price } = data;
    ticket.set({ title, price });
    await ticket.save();

    await msg.ack();
  }
}
