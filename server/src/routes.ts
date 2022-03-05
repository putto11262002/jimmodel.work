import express, { Application } from "express";
import cors from 'cors';
import config from "./config";
import session from 'express-session';
import passport from "passport";
import pasportConfig from './utils/passport/index'
import multer from "multer";
import {createModel, findModels, findModelById, updateModelById, deleteModelById, searchModels, deleteModelExperience, reUploadModelProfileController} from './controller/model.controller';
import validateRequest from './middleware/validation/validateRequest';
import {deleteModelProfile, uploadModelProfile }from "./middleware/fileHandler/modelProfileHandler";
import {createModelSchema, findAllModelSchema, findModelByIdSchema, updateModelSchema, searchModelSchema, uploadModelProfileShema} from './schema/model.schema'
import { createJobSchema, findAllJobsSchema, findCalenderJobSchema, findJobByIdSchema, searchJobsSchema, updateJobSchema } from "./schema/job.schema";
import { createJob, deleteJobById, findAllJobs, findCalenderJob, findJobById, findJobsInRange, searchJobs, updateJobById } from "./controller/job.controller";
import { createUserSchema, findAllUserSchema, findUserByIdSchema, updateUserSchema } from "./schema/user.schema";
import { createUser, deleteUserById, findAllUsers, findUserById, updateUserById } from "./controller/user.controller";
import { checkLogin, login, logout } from "./controller/auth.controller";
import uploadUserProfile, { deleteUserProfile } from "./middleware/fileHandler/userProfileHandler";
import { isAdmin, isAuthenticated, isAuthenticatedToCreateModel } from "./middleware/auth/Auth.middleware";
import { modelProfileDoc, jobConfirmationDoc } from "./controller/doc.controller";
import NotFoundController from "./controller/NotFound.controller";
import helmet from "helmet";
import parseJobObject from "./middleware/parseObjects/parseJobObject";
import parseModelObject from "./middleware/parseObjects/parseModelObject";



export default (app: Application) =>{

    app.use(helmet({
        crossOriginResourcePolicy: {policy: 'cross-origin'}
      }))
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));


    app.use(cors(config.cors));

    app.use(session(config.session));

    app.use(passport.initialize());
    app.use(passport.session());
    pasportConfig(passport);
   

    app.use('/public', express.static('public')); 

    app.post('/auth', login);
    app.get('/auth', checkLogin);
    app.delete("/auth", logout);
    app.post('/model', multer().any(), isAuthenticatedToCreateModel, parseModelObject,validateRequest(createModelSchema), uploadModelProfile, createModel);
    

    app.get('/model',isAuthenticated, validateRequest(findAllModelSchema),findModels);
    app.get('/model/:model_id' , isAuthenticated, validateRequest(findModelByIdSchema), findModelById);
    app.get('/model/search/:searchTerm', isAuthenticated,validateRequest(searchModelSchema),searchModels);
    app.put('/model/:model_id', isAuthenticated,  multer().any(), parseModelObject, validateRequest(updateModelSchema), uploadModelProfile, updateModelById);
    app.delete('/model/:model_id', isAuthenticated, deleteModelProfile, deleteModelById);
    app.delete('/model/experience/:experience_id', isAuthenticated,deleteModelExperience)

    app.post('/job', isAuthenticated, parseJobObject,validateRequest(createJobSchema), createJob);
    app.get('/job', isAuthenticated,validateRequest(findAllJobsSchema), findAllJobs);
    app.get('/job/:job_id', isAuthenticated, findJobById);
    app.get('/job/search/:searchTerm', isAuthenticated,searchJobs);
    app.get('/job/calender/:from/:to', isAuthenticated, validateRequest(findCalenderJobSchema), findCalenderJob);
    app.put('/job/:job_id', isAuthenticated, parseJobObject, validateRequest(updateJobSchema), updateJobById);
    app.delete('/job/:job_id', isAuthenticated, deleteJobById);


    app.post('/user' , isAdmin,multer().single('profile_img_file') ,validateRequest(createUserSchema), uploadUserProfile,createUser);
    app.get('/user', isAdmin,validateRequest(findAllUserSchema), findAllUsers);
    app.get('/user/:user_id', isAdmin,validateRequest(findUserByIdSchema),  findUserById);
    app.put('/user/:user_id',  isAdmin,multer().single('profile_img_file'), validateRequest(updateUserSchema), uploadUserProfile,updateUserById);
    app.delete('/user/:user_id', isAdmin,deleteUserProfile,deleteUserById);

    app.get('/doc/model-profile/:model_id', modelProfileDoc);
    app.get('/doc/job-confirmation/:job_id',  jobConfirmationDoc);

    app.use(NotFoundController)


    



    

    
}