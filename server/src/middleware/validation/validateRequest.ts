import { NextFunction, Request, Response } from "express";
import { AnySchema, ValidationError } from "yup";
import log from '../../utils/logging/logger';

export default (schema: AnySchema)  => async (req: Request, res: Response, next: NextFunction) => {
    try{
        await schema.validate({
            body: req.body,
            param: req.params,
            query: req.query
        })
        return next()
    }catch(e){
        log.error(e)
        if(e instanceof ValidationError){
            return res.status(400).send(e.message)
        }
        return res.status(500).send('Something went wrong. Please try agian.')
    }

}