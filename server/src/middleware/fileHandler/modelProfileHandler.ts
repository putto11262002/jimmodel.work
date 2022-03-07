import { NextFunction, Request, Response } from "express";
import * as fs from "fs";
const fsPromises = fs.promises;
import log from "../../utils/logging/logger";
import modelService from "../../service/model/index.service";
import { DEFAULT_MODEL_PROFILE_IMAGE } from "../../utils/constants";

export const uploadModelProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files as Express.Multer.File[];
  if (files.length > 6)
    return res
      .status(404)
      .send("Number of allowed profile image upload exceeded");
  const profileUploaded = new Set();
  for (let file of files) {
    const profileNum = parseInt(file.fieldname);
    if (profileNum < 1 || profileNum > 6)
      return res.status(404).send("Invalid profile image key.");
    if (profileUploaded.has(profileNum))
      return res.status(404).send("Cannot have duplicated key.");

    profileUploaded.add(profileNum);
  }

  for(let file of files){
    try{
      if ( req.body[`profile_img_${file.fieldname}`] !== undefined) {
        fs.unlink( req.body[`profile_img_${file.fieldname}`], (err) => {
          if (err) {
            log.error(err)
          }
        });
      }
    const extension = file.mimetype.split("/").pop();
    const destination = "public/model-profiles/";
    const fileName = `${req.body.first_name.toLowerCase()}-${req.body.last_name.toLowerCase()}-${file.fieldname}-${Date.now()}.${extension}`;
    const path = destination + fileName;
    await fsPromises.writeFile(path, file.buffer);
    req.body[`profile_img_${file.fieldname}`] = path
    }catch(err){
      log.error(err);
      return res.status(500).send('Something went wrong. Please try again.')
    }

  }

  
  
  next()
  
};

export const deleteModelProfile = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const rawModel = await modelService.findOneById(req.params.model_id);
    const model = await  rawModel.dataValues;
    
    for(let i = 1; i < 7; i++){
      if(model[`profile_img_${i}`] !== null){
        if(model[`profile_img_${i}`] === DEFAULT_MODEL_PROFILE_IMAGE) {
          continue;
        }
       try{
         await fsPromises.unlink(model[`profile_img_${i}`]);
       }catch(err){
         log.error(err)
       }
      }
     }
     next()
    
  }catch(err){
    log.error(err);
    res.status(500).send('Something went wrong. Please try again.');

  }


}