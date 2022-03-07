import { NextFunction, Request, Response } from "express";
import fs from "fs";
const fsPromises = fs.promises;
import userService from "../../service/user/index.service";
import { DEFAULT_USER_PROFILE_IMAGE } from "../../utils/constants";
import log from "../../utils/logging/logger";

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.file !== undefined) {
    if (req.body.profile_img !== undefined) {
      fs.unlink(req.body.profile_img, (err) => {
        if (err) {
          log.error(err);
        }
      });
    }
    const extension = req.file?.mimetype.split("/").pop();
    const destination = "public/user-profiles/";
    const fileName = `${req.body.username}-${Date.now()}.${extension}`;
    const path = destination + fileName;

    fs.createWriteStream(path).write(req.file?.buffer, (e) => {
      if (e) {
        log.error(e);
        return res.status(500).send("Something went wrong. Please try again.");
      } else {
        req.body.profile_img = path;
        next();
      }
    });
  } else {
    next();
  }
};

export const deleteUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rawUser = await userService.findUserById(req.params.user_id);
    if(!rawUser){
      return res.status(404).send('User does not exist.')
    }
    const user = await rawUser.dataValues;
    if(user.role === 'root'){
      return res.status(404).send('Cannot delete root user.')
  }


    if (user.profile_img !== null && user.profile_img !== DEFAULT_USER_PROFILE_IMAGE) {
      try {
        await fsPromises.unlink(user.profile_img);
      } catch (err) {
        log.error(err);
      }
    }

    next();
  } catch (err) {
    log.error(err);
    res.status(500).send("Something went wrong. Please try again.");
  }
};
