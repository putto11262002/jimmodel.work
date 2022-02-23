import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
    
    
    if(req.body.Models !== undefined){
        
       
        try{
            const parsedModels= JSON.parse(req.body.Models);
           
                req.body.Models = parsedModels
                next()
           
        }catch(e){
            return res.status(404).send('Talents booked must be an array.')
        }
    }else{
        res.status(404).send('Talents booked cannot be empty.')

    }

}