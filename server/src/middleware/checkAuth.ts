import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //taking the token from the header of the request
  let token = req.header('authorization');

  if (!token) {
    return res.status(403).json({
      errors: [
        {
          msg: 'unauthorized',
        },
      ],
    });
  }

  // separating the Bearer from the actual token
  token = token.split(' ')[1];

  // veryfing if the user is authenticated
  try {
    const user = (await JWT.verify(
      token,
      process.env.JWT_SECRET as string
    )) as { email: string };

    req.user = user.email;

    next();
  } catch (err) {
    return res.status(403).json({
      errors: [
        {
          msg: 'unauthorized',
        },
      ],
    });
  }
};
