import { TicketCreatedEvent } from './ticket-created-event';
import { Publisher } from './base-publisher';
import { Subjects } from './subjects';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
