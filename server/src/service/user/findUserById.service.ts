import db from '../../model/index.model';
const User = db.User;
import IQueryOption from '../../interface/QueryOption.interface'

export default (user_id: string, queryOption?: IQueryOption) => {
    return User.findOne({where: {
        user_id: user_id
    }});

}