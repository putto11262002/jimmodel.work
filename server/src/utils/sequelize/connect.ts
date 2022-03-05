import db from '../../model/index.model';
import log from '../logging/logger';
import userService from '../../service/user/index.service'
import config from '../../config';
import bcrypt from 'bcryptjs'
import { DEFAULT_USER_PROFILE_IMAGE } from '../constants';

const initialiseRootUser = async() => {
    try{
       
        const existingRootUser = await userService.findUserByUsername('root');
        if(existingRootUser) return;
        const hash = await bcrypt.hash(config.rootUser.password, config.bcrpyt.salt)
        const createRootUSer = await userService.createUser({first_name: 'root',last_name: 'root', username: 'root', password: hash, role: 'root', profile_img: DEFAULT_USER_PROFILE_IMAGE});
        log.info('Root user created')
    }catch(e){
        log.error(e);
        return;
    }
    

}
export default async (): Promise<void>=> {
    try{
        await db.sequelize.sync();
        log.info('Connected to database');
        initialiseRootUser();

    }catch(e){
        log.error(e)
    }
}


