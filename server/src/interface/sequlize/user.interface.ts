import {Model} from 'sequelize';
export default interface UserInstance extends Model{
    user_id?: string,
    first_name: string,
    last_name: string,
    username: string,
    password: string,
    email: string,
    profile_img: string,
    colour: string,
    role: string
}