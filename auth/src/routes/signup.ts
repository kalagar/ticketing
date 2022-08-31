import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@klgr_ticketing/common';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('email must be valid'),
    body('password')
      .trim()
      .isStrongPassword({
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
        minLowercase: 1,
        minUppercase: 1,
      })
      .withMessage('use strong password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('User already exists');
    }
    const user = User.build({ email, password });
    await user.save();

    // generate JWT
    const userJwt = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_KEY!,
      {
        expiresIn: '1h',
        algorithm: 'HS256',
      },
    );

    // store it in session
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  },
);

export { router as signupRouter };
