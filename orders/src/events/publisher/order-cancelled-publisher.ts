import {
  OrderCancelledEvent,
  Publisher,
  Subjects,
} from '@klgr_ticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
