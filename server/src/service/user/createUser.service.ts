import db from "../../model/index.model";
const User = db.User;
import IUser from '../../interface/User.interface'

export default (user: IUser) => {
    return User.create(user);
}