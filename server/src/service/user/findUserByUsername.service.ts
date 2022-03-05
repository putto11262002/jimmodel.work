import db from "../../model/index.model";
import IQueryOption from '../../interface/User.interface'
const User = db.User;
export default (username: string, queryOption?: IQueryOption) => {
    return User.findOne({...queryOption, where: {
        username: username
    }});
}