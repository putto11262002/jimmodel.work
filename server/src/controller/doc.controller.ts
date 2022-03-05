import { Request, Response } from "express";
import modelService from "../service/model/index.service";
import db from "../model/index.model";
import log from "../utils/logging/logger";
import ModelProfileDoc from "../utils/doc/modelProfile.doc";
import JobConfirmationDoc from '../utils/doc/jobConfirmation.doc'
import jobService from '../service/job/index.service'
export const modelProfileDoc = async(req: Request, res: Response) => {
    try{
       
        const rawModel = await modelService.findOneById(req.params.model_id, {include: [
            {model: db.Measurement, required: false},
            {model: db.Experience, required: false}
        ]})
        if(!rawModel){
            res.sendStatus(404)
        }
        const model = await rawModel.dataValues;
        const doc = await  ModelProfileDoc(model)

        res
        .writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=sample.pdf',
            
        })

        doc.pipe(res)

       
    }catch(e){
        log.error(e);
        res.status(500).send('Something went wrong. Please try again.')
    }


}

export const jobConfirmationDoc = async(req: Request, res: Response) => {
    try{
       
        const rawJob = await jobService.findJobById(req.params.job_id, {include: [
            {model: db.User, required: false},
            {model: db.Model, as: "Models", required: false},
            {model: db.JobDate, required: false}
        ]})
        if(!rawJob){
            res.sendStatus(404)
        }
        const job = await rawJob.dataValues;
        const doc = await  JobConfirmationDoc(job)

        res
        .writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename=sample.pdf',
            
        })

        doc.pipe(res)

       
    }catch(e){
        log.error(e);
        res.status(500).send('Something went wrong. Please try again.')
    }


}