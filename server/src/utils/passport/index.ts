import db from "../../model/index.model";
const User = db.User;
import {Strategy as localStragety} from 'passport-local';
import bcrypt from 'bcryptjs';
import { PassportStatic } from "passport";
import userService from '../../service/user/index.service';
import IUser from "../../interface/User.interface";
import log from "../logging/logger";



declare global {
    namespace Express {
        interface User {
            user_id: string,
    first_name: string,
    last_name: string,
    username: string,
    password: string,
    email: string,
    profile_img: string,
    colour: string,
    role: string
        }
    }
}
export default  (passport: PassportStatic) => {
    passport.use(
        new localStragety(async(username, password, cb) => {
            try{
                const rawUser = await userService.findUserByUsername(username);
               
                if(!rawUser){
                    return cb(null,  'does not exist')
                }
                ('t')
                const user = await rawUser.dataValues;
                const result = await bcrypt.compare(password, user.password);
                if(result){
                    return cb(null, user)
                }else{
                    return cb(null, 'wrong password')
                }
           
            }catch(e){
                log.error(e)
                return db(e, null)
            }
        })
    );

    passport.serializeUser((user, cb) => {
        cb(null, user.user_id)
    });
    passport.deserializeUser(async(user_id: string, cb) => {
        try{
            const rawUser = await userService.findUserById(user_id);
            const user = await rawUser.dataValues;
            cb(null, user)
        }catch(e){
            cb(e, null)
        }
       
      })

}