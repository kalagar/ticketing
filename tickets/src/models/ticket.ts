import mongoose from 'mongoose';

interface ITicket {
  title: string;
  price: number;
  userId: string;
}

interface ITicketModel extends ITicket, mongoose.Model<ITicketDocument> {
  build: (ticket: ITicket) => ITicketDocument;
}

interface ITicketDocument extends ITicket, mongoose.Document {
  title: string;
  price: number;
  userId: string;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  },
);

ticketSchema.statics.build = (ticket: ITicket) => {
  return new Ticket(ticket);
};

const Ticket = mongoose.model<ITicketDocument, ITicketModel>(
  'Ticket',
  ticketSchema,
);

export { Ticket };
