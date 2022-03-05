import { NextFunction, Request, Response } from "express";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        return next()
      }
      return res.status(401).send('Unauthenticated');

}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        if(req.user?.role == 'admin' || req.user?.role == 'root') return next()
        return res.status(403).send('Unauthenticated');
      }
      return res.status(401).send('Unauthenticated');
   
}

export const isAuthenticatedToCreateModel = (req: Request, res: Response, next: NextFunction) => {
     if(req.isAuthenticated()){
         next()
     }else{
         req.body.approved = false;
         next()
     }
}