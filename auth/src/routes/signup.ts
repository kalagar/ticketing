import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

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
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    throw new DatabaseConnectionError();

    const { email, password } = req.body;
    res.send({
      message: 'Successfully signed up!',
      user: {
        email,
        password,
      },
    });
  },
);

export { router as signupRouter };
