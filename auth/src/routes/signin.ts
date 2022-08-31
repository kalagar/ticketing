import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError, validateRequest } from '@klgr_ticketing/common';
import { User } from '../models/user';
import { PasswordService } from '../services/password';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('email must be valid'),
    body('password').trim().notEmpty().withMessage('password is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordMatch = await PasswordService.comparePassword(
      password,
      existingUser.password,
    );

    if (!passwordMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    // generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!,
      {
        expiresIn: '1h',
      },
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  },
);

export { router as signinRouter };
