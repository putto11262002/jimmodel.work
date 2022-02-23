import { Request, Response } from "express";
import { Op } from "sequelize";
import ModelInstance from "../interface/sequlize/model.interface";
import IQueryOption from "../interface/QueryOption.interface";
import modelService from "../service/model/index.service";
import log from "../utils/logging/logger";
import getQueryOption from "../utils/sequelize/getModelQueryOption";
import measurementService from "../service/measurement/index.service";
import experienceService from "../service/experience/index.service";
import IExperience from "../interface/Experience.interface";
import jobService from "../service/job/index.service";
import db from "../model/index.model";
import IJob from "../interface/Job.interface";

export const createModel = async (req: Request, res: Response) => {
  try {
    // (req.files as Express.Multer.File[]).forEach((file, index) => {
    //   req.body[`profile_img_${index + 1}`] =
    //     file.destination + "/" + file.filename;
    // });

    const createdModelRaw = await modelService.create(req.body);
    const createdModel = await createdModelRaw.dataValues;

    req.body.Experiences.forEach(async (experience: IExperience) => {
      await experienceService.createExperience({
        ...experience,
        model_id: createdModel.model_id,
      });
    });

    await measurementService.createMeasurement({
      ...req.body.Measurement,
      model_id: createdModel.model_id,
    });

    const defaultQueryOption: IQueryOption = {};
    const queryOption = getQueryOption(req, res, defaultQueryOption);
    const model = await modelService.findOneById(
      createdModel.model_id,
      queryOption
    );

    res.status(201).send(model);
  } catch (e) {
    log.error(e);
    res.status(500).send("Something went wrong. Please try agian.");
  }
};

export const findModels = async (req: Request, res: Response) => {
  try {
    const defaultQueryOption: IQueryOption = {};
    const queryOption: IQueryOption = getQueryOption(
      req,
      res,
      defaultQueryOption
    );
    log.info("querying models...");
    const models: Array<ModelInstance> = await modelService.findAll(
      queryOption
    );
    log.info("queried models");
    res.status(200).send(models);
  } catch (e) {
    log.error(e);
    res.status(500).send("Something went wrong. Please try again.");
  }
};

export const findModelById = async (req: Request, res: Response) => {
  try {
    const defaultQueryOption: IQueryOption = {};
    const queryOption = getQueryOption(req, res, defaultQueryOption);
    log.info("querying model by id...");
    const model: ModelInstance = await modelService.findOneById(
      req.params.model_id,
      queryOption
    );
    log.info("queried model by id");
    if (!model) {
      res.status(404).send("Model does not exist");
    }
    log.info("queried model by id");
    res.status(200).send(model);
  } catch (e) {
    log.error(e);
    res.status(500).send("Something went wrong. Please try agian.");
  }
};

export const updateModelById = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    await modelService.updateOneById(req.params.model_id, req.body);

    req.body.Experiences.forEach(
      async (experience: IExperience) => {
        try {
          if (experience.experience_id !== undefined) {
            await experienceService.updateExperience(
              experience,
              experience.experience_id
            );
          } else {
            await experienceService.createExperience({
              ...experience,
              model_id: req.params.model_id,
            });
          }
        } catch (e) {
          log.error(e);
          return res
            .status(500)
            .send("Something went wrong. Please try agian.");
        }
      }
    )
  
      await measurementService.updateMeasurement(
        req.body.Measurement,
        req.params.model_id
      );
    

    const defaultQueryOption: IQueryOption = {};
    const queryOption = getQueryOption(req, res, defaultQueryOption);
    const updatedModel = await modelService.findOneById(
      req.params.model_id,
      queryOption
    );
    if (!updatedModel) return res.status(404).send("Model does not exist");
    return res.status(200).send(updatedModel);
  } catch (e) {
    log.error(e);
    res.status(500).send("Something went wrong. Please try again");
  }
};

export const deleteModelById = async (req: Request, res: Response) => {
  try {
    const rawModel = await modelService.findOneById(req.params.model_id, {
      include: [
        {
          model: db.Experience,
          required: false,
          attributes: ["experience_id"],
        },
        { model: db.Job, required: false, attributes: ["job_id"], as: 'Jobs'},
      ],
    });
    if (!rawModel) {
      res.status(404).send("Model does not exist.");
    }
    const model = await rawModel.dataValues;
    model.Experiences.forEach(async (experience: IExperience) => {
      log.info("deleting experience");
      await experienceService.deleteExperience(experience.experience_id);
    });
    model.Jobs.forEach(async (job: IJob) => {
      log.info("deleting job");
      await jobService.deleteJobById(job.job_id);
    });
    log.info("deleting measurement");
    await measurementService.deleteMeasurement(req.params.model_id);
    log.info("deleting model");
    await modelService.deleteOneById(req.params.model_id);
    log.info("model successfully deleted");

    res.status(200).send("Model successfully deleted.");
  } catch (e) {
    log.error(e);
    res.status(500).send("Something went wrong. Please try again.");
  }
};

export const deleteModelExperience = async (req: Request, res: Response) => {
  try {
    await experienceService.deleteExperience(req.params.experience_id);
    res.status(200).send("Experience successfully deleted");
  } catch (e) {
    log.error(e);
    res.status(500).send("Something went wrong. Please try again.");
  }
};
export const searchModels = async (req: Request, res: Response) => {
 
  try {
    log.info("searching models");
    const searchedModelId: Array<any> = await modelService.seachAll(
      req.params.searchTerm,
      
    );
    console.log(searchedModelId)

    log.info("model searched");
    try {
      const defaultQueryOption = {
        where: {
          model_id: {
            [Op.in]: searchedModelId.map((modelId: any) => modelId.model_id),
          },
        },
      };
      const queryOption = getQueryOption(req, res, defaultQueryOption);
      const searchedModels = await modelService.findAll(queryOption);
      res.status(200).send(searchedModels);
    } catch (e) {
      log.error(e);
      res.status(500).send("Something went wrong. Please try again.");
    }
  } catch (e) {
    log.error(e);
    res.status(500).send("Something went wrong. Please try again.");
  }
};

export const reUploadModelProfileController = async (
  req: Request,
  res: Response
) => {
  try {
    await modelService.updateOneById(req.params.model_id, {
      [`profile_img_${req.params.image_number}`]: `${req.file?.destination}${req.file?.filename}`,
    });
    const defaultQueryOption: IQueryOption = {};
    const queryOption = getQueryOption(req, res, defaultQueryOption);
    const model = await modelService.findOneById(
      req.params.model_id,
      queryOption
    );
    res.status(200).send(model);
  } catch (e) {
    log.error(e);
    res.status(500).send("Something went wrong. Please try again.");
  }
};

