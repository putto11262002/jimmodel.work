import { Request, Response, NextFunction } from "express";
import log from "../../utils/logging/logger";

export default (req: Request, res: Response, next: NextFunction) => {
    
    
    if(req.body.Models !== undefined){
        
       
        try{
           
            const parsedModels= JSON.parse(req.body.Models);
           
                req.body.Models = parsedModels
                if(req.body.JobDates !== undefined){
                    try{
                       
                    
                        const parsedJobDates = JSON.parse(req.body.JobDates);
                        req.body.JobDates = parsedJobDates;
                        next()
                    }catch(e){
                        console.error(e)
                        return res.status(404).send('JobDates must be an array.')
                    }
                }else{
                    return res.status(404).send('JobDates cannot be empty.')
                }
           
        }catch(e){
            return res.status(404).send('Talents booked must be an array.')
        }
    }else{
        res.status(404).send('Talents booked cannot be empty.')

    }

}