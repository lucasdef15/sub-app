import express, { Router } from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';
import { checkAuth } from '../middleware/checkAuth';

const router = express.Router();

//post request for signing up
router.post(
  '/signup',
  body('email').isEmail().withMessage('The email is invalid'),
  body('password')
    .isLength({ min: 5 })
    .withMessage('The password is too short'),
  async (req, res) => {
    //return an array of errors
    const validationError = validationResult(req);

    if (!validationError.isEmpty()) {
      const errors = validationError.array().map((error) => {
        return {
          msg: error.msg,
        };
      });

      return res.json({ errors, data: null });
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        errors: [
          {
            msg: 'Email alredy in use',
          },
        ],
        data: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //creating new user and saving it to the database
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    const token = await JWT.sign(
      { email: newUser.email },
      process.env.JWT_SECRET as string,
      //for a real application use 5 hour or a day
      {
        expiresIn: 36000,
      }
    );

    res.json({
      errors: [],
      data: {
        token,
        user: {
          id: newUser._id,
          email: newUser.email,
        },
      },
    });
  }
);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({
      errors: [
        {
          msg: 'Invalid credentials',
        },
      ],
      data: null,
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.json({
      errors: [
        {
          msg: 'Password is invalid',
        },
      ],
      data: null,
    });
  }

  const token = await JWT.sign(
    { email: user.email },
    process.env.JWT_SECRET as string,
    //for a real application use 5 hour or a day
    {
      expiresIn: 36000,
    }
  );

  res.json({
    error: [],
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    },
  });
});

interface UserObject {
  _id: string;
  email: string;
}

router.get('/me', checkAuth, async (req, res) => {
  const user: UserObject | null = await User.findOne({ email: req.user });

  if (user) {
    return res.json({
      errors: [],
      data: {
        user: {
          id: user._id,
          email: user.email,
        },
      },
    });
  }
});

export default router;
