import express from 'express';
import { Ticket } from '../models/ticket';
import { NotFoundError } from '@klgr_ticketing/common';

const router = express.Router();

router.get('/api/tickets', async (req, res) => {
  const tickets = await Ticket.find({});

  res.send(tickets);
});

router.get('/api/tickets/:id', async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError('Ticket not found');
  }

  res.send(ticket);
});

export { router as showTicketRouter };
