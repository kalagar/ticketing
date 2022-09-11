import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@klgr_ticketing/common';
import { body } from 'express-validator';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('price must be greater than 0'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });
    await ticket.save().catch((e) => {
      res.status(400).send(e);
    });
    res.status(201).send(ticket);
  },
);

export { router as createTicketRouter };
