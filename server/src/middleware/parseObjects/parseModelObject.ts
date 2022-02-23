import { Request, Response, NextFunction } from "express";
import IExperience from "../../interface/Experience.interface";
import log from "../../utils/logging/logger";
export default (req: Request, res: Response, next: NextFunction) => {
  if (req.body.Experiences !== undefined) {
    try {
      const parsedExperiences = JSON.parse(req.body.Experiences);

      req.body.Experiences = parsedExperiences;
    } catch (e) {
      log.error(e);
      return res.status(404).send("Experiences must be an array.");
    }
  } else {
    req.body.Experiences = Array();
  }

  if (req.body.Measurement === undefined) {
    req.body.Measurement = Object();
  } else {
    try {
      req.body.Measurement = JSON.parse(req.body.Measurement);
    } catch (e) {
      log.error(e);
      return res.status(404).send("Measurement must be in JSON format.");
    }
  }
  next();
};
