import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@klgr_ticketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
