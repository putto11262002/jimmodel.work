import { Request, Response } from "express";
import JobService from "../service/job/index.service";
import log from "../utils/logging/logger";
import IQueryOption from "../interface/QueryOption.interface";
import getQueryOption from "../utils/sequelize/getJobQueryOption";
import { Op } from "sequelize";
import ModelService from "../service/model/index.service";
import db from "../model/index.model";
import modelService from "../service/model/index.service";
export const createJob = async (req: Request, res: Response) => {
  try {
    const createdJob = await JobService.createJob(req.body);
    const job = await JobService.findJobById(createdJob.dataValues.job_id);
    for(let talent of req.body.Models){
  
      const model = await ModelService.findOneById(talent);
      if (!model) return res.status(404).send("Talent does not exist.");
      await job.addModel(model);

    }


    const defaultQueryOption: IQueryOption = {};
    const queryOption = getQueryOption(req, res, defaultQueryOption);
    const resulted = await JobService.findJobById(createdJob.dataValues.job_id, queryOption);
    res.status(200).send(resulted)
  } catch (e) {
    log.error(e);
    res.status(500).send("Something went wrong. Pleaser try again");
  }
};

export const findAllJobs = async (req: Request, res: Response) => {
  try {
    const defaultQueryOption: IQueryOption = {};
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
      return res.status(404).send('Job does not exist.');
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
    await JobService.updateJobById(req.params.job_id, req.body);
    const defaultQueryOption: IQueryOption = {};
    const queryOption = getQueryOption(req, res, defaultQueryOption);
   
    
    const updatedJob = await JobService.findJobById(req.params.job_id, queryOption);
    res.status(200).send(updatedJob)
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
      },
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
    const defaultQueryOption: IQueryOption = {
      attributes: ['job_id', 'shooting_start', 'shooting_end', 'fitting_date', "status"],
     
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
            ],
          },
        ],
      },
    };
    const queryOption = getQueryOption(req, res, defaultQueryOption);
    const jobs = await JobService.findAllJobs(queryOption);
    const calenderJobs: any = {};
    for (let job of jobs) {
      const current = new Date(job.shooting_start);

      const shootingEnd = new Date(job.shooting_end);

      while (current <= shootingEnd) {
        if (
          !(
            `${current.getDate()}-${
              current.getMonth() + 1
            }-${current.getFullYear()}` in calenderJobs
          )
        ) {
          calenderJobs[
            `${current.getDate()}-${
              current.getMonth() + 1
            }-${current.getFullYear()}`
          ] = [];
        }
        calenderJobs[
          `${current.getDate()}-${
            current.getMonth() + 1
          }-${current.getFullYear()}`
        ].push({...job.dataValues, type: job.dataValues.status ? 'job' : 'option'});
        console.log(job.dataValues.status)

        current.setDate(current.getDate() + 1);
      }
      if(job.fitting_date !== undefined){
        const fittingDate = new Date(job.fitting_date);
        if (
          !(
            `${fittingDate.getDate()}-${
              fittingDate.getMonth() + 1
            }-${fittingDate.getFullYear()}` in calenderJobs
          )
        ) {
          calenderJobs[
            `${fittingDate.getDate()}-${
              fittingDate.getMonth() + 1
            }-${fittingDate.getFullYear()}`
          ] = [];
        }

        calenderJobs[
          `${fittingDate.getDate()}-${
            fittingDate.getMonth() + 1
          }-${fittingDate.getFullYear()}`
        ].push({...job.dataValues, type: 'fitting'});

      }
     
    }

    res.status(200).send(calenderJobs);
  } catch (e) {
    log.error(e);
    res.status(500).send("Something went worng. Please try agian.");
  }
};

