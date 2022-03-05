import passport from "passport";
import { NextFunction, Request, Response } from "express";

 export const login = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err, user) => {
    if (err)
      return res
        .status(500)
        .send({
          login: false,
          message: "Something went wrong. Please try again.",
        });
    if (user === 'does not exist')
      return res
        .status(401)
        .send('User does not exist'
        );
    if (user === 'wrong password') return res.status(401).send('Wrong username/password combination.')
    req.logIn(user, (err) => {
      if (err)
        return res
          .status(500)
          .send({
            login: false,
            message: "Something went wrong. Please try again.",
          });
      return res
        .status(200)
        .send( { ...user, password: null });
    });
  })(req, res, next);
};

export const checkLogin = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    return res
      .status(200)
      .send({ ...req.user, password: null });
  }
  return res.status(401).send('Unauthenticated');
};

export const logout = (req: Request, res: Response) => {
  req.logOut();
  return res.sendStatus(200)
}
