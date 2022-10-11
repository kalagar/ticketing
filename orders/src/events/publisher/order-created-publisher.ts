import { OrderCreatedEvent, Publisher, Subjects } from '@klgr_ticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
