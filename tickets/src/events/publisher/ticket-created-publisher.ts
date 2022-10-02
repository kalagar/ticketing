import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@klgr_ticketing/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
