import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/api/users/signout', (req: Request, res: Response) => {
  req.session = undefined;
  res.status(200).send({
    currentUser: null,
  });
});

export { router as signoutRouter };
