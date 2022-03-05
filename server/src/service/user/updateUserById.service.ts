import IUser from '../../interface/User.interface';
import db from '../../model/index.model';
const User = db.User;

export default (user_id: string, user: IUser) => {
    return User.update(user, {where: {user_id: user_id}});
}