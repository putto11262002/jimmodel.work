import { Request, Response } from "express";
import userService from '../service/user/index.service';
import IQueryOption from '../interface/QueryOption.interface'
import getQueryOption from "../utils/sequelize/getJobQueryOption";
import log from "../utils/logging/logger";
import bcrypt from 'bcryptjs';
import config from "../config";
import IUser from "../interface/User.interface";
export const createUser = async(req: Request, res: Response) => {
    try{
        const exitingUser: Array<IUser> = await userService.findUserByUsername(req.body.username)
       
        if(exitingUser){
            return res.status(400).send('User already exist');
        }
        const hash = await bcrypt.hash(req.body.password, config.bcrpyt.salt);
        const createdUser = await userService.createUser({...req.body, password: hash});
        const defaultQueryOption: IQueryOption = {
            attributes: ['first_name', 'last_name', 'username', 'colour', 'profile_img', 'email', 'user_id', 'role']
        };
        const queryOption = getQueryOption(req, res, defaultQueryOption);
        const user = await userService.findUserById(createdUser.dataValues.user_id, queryOption);
    
        res.status(200).send(user);
    }catch(e){
        log.error(e);
        res.status(500).send('Something went wrong. Please try agian.')
    }
}

export const findAllUsers = async(req: Request , res: Response) => {
    try{
        const defaultQueryOption: IQueryOption = {
            attributes: ['first_name', 'last_name', 'username', 'colour', 'profile_img', 'email', 'user_id', 'role']
        };
        const queryOption = getQueryOption(req, res, defaultQueryOption);
        log.info('querying users');
        const users = await userService.findAllUsers(queryOption);
        res.status(200).send(users);
    }catch(e){
        log.error(e);
        res.status(500).send('Something went wrong. Please try again.')
    }
}

export const findUserById = async(req: Request, res: Response) => {
    try{
        const defaultQueryOption: IQueryOption = {
            attributes: ['first_name', 'last_name', 'username', 'colour', 'profile_img', 'email', 'user_id', 'role']
        };
        const queryOption = getQueryOption(req, res, defaultQueryOption);
        const user = await userService.findUserById(req.params.user_id, queryOption);
        res.status(200).send(user)
    }catch(e){
        log.error(e);
        res.status(500).send('Something went wrong. Please try again.')
    }
}

export const updateUserById = async(req: Request, res: Response) => {
    try{
        if(req.body.password !== undefined){
            const hash = await bcrypt.hash(req.body.password, config.bcrpyt.salt);
            req.body = {...req.body, password: hash}
        }
       await userService.updateUserById(req.params.user_id, req.body);
       const defaultQueryOption: IQueryOption = {
        attributes: ['first_name', 'last_name', 'username', 'colour', 'profile_img', 'email', 'user_id', 'role']
    };
        const queryOption = getQueryOption(req, res, defaultQueryOption);
        const user = await userService.findUserById(req.params.user_id, queryOption);
        res.status(200).send(user)
    }catch(e){
        log.error(e);
        res.status(500).send('Something went wrong. Please try again.')
    }
}

export const deleteUserById = async(req: Request, res: Response) => {
    try{
        const rawUser = await userService.deleteUserById(req.params.user_id);
        const user = await rawUser.dataValues;
     
        const result = await userService.deleteUserById(req.params.user_id);
        log.info('User successfully deleted');
        res.status(200).send('User successfully deleted');
    }catch(e){
        log.error(e);
        res.status(500).send('Something went wrong. Please try again.');
    }
}