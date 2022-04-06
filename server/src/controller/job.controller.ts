import { Request, Response } from "express";
import JobService from "../service/job/index.service";
import log from "../utils/logging/logger";
import IQueryOption from "../interface/QueryOption.interface";
import getQueryOption from "../utils/sequelize/getJobQueryOption";
import { Op } from "sequelize";
import ModelService from "../service/model/index.service";
import db from "../model/index.model";
import modelService from "../service/model/index.service";
import IModel from "../interface/Model.interface";
import jobDateService from "../service/jobDate/index.service";
import IJob from "../interface/Job.interface";
import IJobDate from "../interface/IJobDate.interface";
export const createJob = async (req: Request, res: Response) => {
  try {
    (req.body);
    const createdJob = await JobService.createJob(req.body);
    const job = await JobService.findJobById(createdJob.dataValues.job_id);
    for (let talent of req.body.Models) {
      const model = await ModelService.findOneById(talent);
      if (!model) return res.status(404).send("Talent does not exist.");
      await job.addModel(model);
    }

    const defaultQueryOption: IQueryOption = {};
    const queryOption = getQueryOption(req, res, defaultQueryOption);
    const resulted = await JobService.findJobById(
      createdJob.dataValues.job_id,
      queryOption
    );
    res.status(200).send(resulted);
  } catch (e) {
    log.error(e);
    res.status(500).send("Something went wrong. Pleaser try again");
  }
};

export const findAllJobs = async (req: Request, res: Response) => {
  try {
    const defaultQueryOption: IQueryOption = {where: {title: {
      [Op.notLike]: "Not available"
    }}};
    const queryOption = getQueryOption(req, res, defaultQueryOption);
    const jobs = await JobService.findAllJobs(queryOption);
    res.status(200).send(jobs);
  } catch (e) {
    log.error(e);
    res.status(500).send("Something went wrong. Please try again.");
  }
};

export const findJobById = async (req: Request, res: Response) => {
  try {
    const defaultQueryOption: IQueryOption = {};
    const queryOption = getQueryOption(req, res, defaultQueryOption);
    const rawJob = await JobService.findJobById(req.params.job_id, queryOption);
    if (!rawJob) {
      return res.status(404).send("Job does not exist.");
    }
    const job = await rawJob.dataValues;

    res.status(200).send(job);
  } catch (e) {
    log.error(e);
    res.status(500).send("Something went wrong. Please try again later.");
  }
};

export const updateJobById = async (req: Request, res: Response) => {
  try {
    log.info(req.body.Models.toString())
    const job = await JobService.findJobById(req.params.job_id);
   await jobDateService.deleteJobDate({
      where: { job_id: req.params.job_id },
    } )
    for (let i = 0; i < req.body.JobDates.length; i++) {
      await jobDateService.createJobDate({
        date: req.body.JobDates[i].date as string,
        type: req.body.JobDates[i].type as string,
        job_id: req.params.job_id,
       
      });
     
    }

    const existingTalents: Array<IModel> = await modelService.findAll({include: [
      {model: db.Job,
      required: true,
      as: "Jobs",
    where: {
      job_id: req.params.job_id
    }}
    ]});
    const existingTalentsId: Array<string> = existingTalents.map(model => (model.model_id as string) );

   const updatedTalentsId: Array<string> = (req.body.Models as Array<string>).map(model => (model as string));
   const updatedTalents: Array<IModel> = await  modelService.findAll({where:{
     model_id: {
       [Op.in]: req.body.Models as string
     }
   }})
   const deletedModels: Array<IModel> = existingTalents
                 .filter(model => !updatedTalentsId.includes(model.model_id as string))
                 log.info(updatedTalents.toString())

    const addedModels: Array<IModel> = updatedTalents.filter(model => !existingTalentsId.includes(model.model_id as string))
                 
    
   for(let model of addedModels){
     job.addModel(model)
   }
   for(let model of deletedModels){
     job.removeModel(model)
   }

    await JobService.updateJobById(req.params.job_id, req.body);

    const defaultQueryOption: IQueryOption = {};
    const queryOption = getQueryOption(req, res, defaultQueryOption);

    const updatedJob = await JobService.findJobById(
      req.params.job_id,
      queryOption
    );
    res.status(200).send(updatedJob);
  } catch (e) {
    log.error(e);
    res.status(500).send("Something went wrong. Please try again.");
  }
};

export const deleteJobById = async (req: Request, res: Response) => {
  try {
    await JobService.deleteJobById(req.params.job_id);
    res.status(200).send("Job successfully deleted");
  } catch (e) {
    log.error(e);
    res.status(500).send("Something went wrong. Please try again");
  }
};
export const searchJobs = async (req: Request, res: Response) => {
  try {
    const searchedJobId: Array<string> = await JobService.searchJobs(
      req.params.searchTerm
    );

    const defaultQueryOption: IQueryOption = {
      where: {
        job_id: {
          [Op.in]: searchedJobId.map((job_id: any) => job_id.job_id),
        },
        title: {
          [Op.notLike]: "Not available"
        }
      },
      include: [
        {
          model: db.Model,
          required: false,
          include: [
            {
              model: db.Job,
              required: false,
            },
          ],
        },
      ],
    };
    const queryOption = getQueryOption(req, res, defaultQueryOption);
    const searchedJobs = await JobService.findAllJobs(queryOption);
    res.status(200).send(searchedJobs);
  } catch (e) {
    log.error(e);
    res.status(500).send("Something went wrong. Please try again.");
  }
};

export const findJobsInRange = async (req: Request, res: Response) => {
  try {
    const defaultQueryOption: IQueryOption = {
      where: {
        [Op.or]: [
          {
            [Op.or]: [
              {
                shooting_start: {
                  [Op.gte]: req.params.from,
                },
              },
              {
                shooting_start: {
                  [Op.lte]: req.params.to,
                },
              },
              {
                fitting_date: {
                  [Op.gte]: req.params.from,
                },
              },
            ],
          },
          {
            [Op.or]: [
              {
                shooting_end: {
                  [Op.gte]: req.params.from,
                },
              },
              {
                shooting_end: {
                  [Op.lte]: req.params.to,
                },
              },
              {
                fitting_date: {
                  [Op.lte]: req.params.to,
                },
              },
            ],
          },
        ],
      },
    };
    const queryOption = getQueryOption(req, res, defaultQueryOption);
    const jobs = await JobService.findAllJobs(queryOption);

    res.status(200).send(jobs);
  } catch (e) {
    log.error(e);
    res.status(500).send("Something went worng. Please try agian.");
  }
};

export const findCalenderJob = async (req: Request, res: Response) => {
  try {
   

    const jobs = await JobService.findAllJobs({
      include: [
        {
          model: db.Model,
          required: false,
          as: "Models",
          include: [
            {
              model: db.Job,
              required: false,
              as: "Jobs",
              include: [{ model: db.JobDate, required: false }],
            },
          ],
        },
        {model: db.User, required: false},
        {
          model: db.JobDate,
          required: true,

          where: {
            [Op.or]: [
              {
                date: {
                  [Op.gte]: req.params.from,
                },
              },
              {
                date: {
                  [Op.lte]: req.params.to,
                },
              },
            ],
          },
        },
      ],
    });
    

    const calenderJobs: any = {};
    
    for (let job of jobs) {
     
  

      for (let jobDate of job.JobDates) {
        if(jobDate.type === "final_meeting_date" ) continue;
        const date = new Date(jobDate.date);
        if (
          !(
            `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}` in
            calenderJobs
          )
        ) {
          calenderJobs[
            `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
          ] = [];
        }

        const data = {
          title: job.dataValues.title,
            job_id: job.dataValues.job_id,
            type:
              jobDate.type === "fitting_date"
                ? "fitting"
                : jobDate.type === "final_meeting_date"
                ? "final_meeting"
                : jobDate.type === "rehearsal_date"
                ? "rehearsal"
                : jobDate.type === "block_model_date" ? "block_model" : job.status
                ? "job"
                : "option",
            status: job.dataValues.status,
            Models:    getDubplicatedModel(job.dataValues.Models.map((model: any) => model.dataValues), date),
            User: job.dataValues.User,
      
            
          }
        

        calenderJobs[
          `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
        ].push(data);
      
      }
    }

    res.status(200).send(calenderJobs);
   
  } catch (e) {
    log.error(e);
    res.status(500).send("Something went worng. Please try agian.");
  }
};

const getDubplicatedModel = (
  models: Array<IModel>,
  targetDate: Date
): Array<IModel> => {
  const dupModel: Array<IModel> = Array();
 
  for (let model of models) {
 
    var numberOfDupJobs: number = 0;

    for (let modelJob of model.Jobs as Array<IJob>) {
      for (let jobDate of modelJob.JobDates) {
        const date = new Date(jobDate.date as Date);

        if (
          date.getDate() === targetDate.getDate() &&
          date.getMonth() === targetDate.getMonth()
        ) {
          numberOfDupJobs = numberOfDupJobs + 1;
        }
      }
     
      if (numberOfDupJobs > 1) {
        
        break
      
        break;
      }
    }

    dupModel.push({...model,Jobs: undefined, duplicated: numberOfDupJobs > 1})
  }
  return dupModel;
};
