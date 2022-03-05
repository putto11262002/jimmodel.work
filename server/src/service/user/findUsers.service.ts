import db from '../../model/index.model';
const User = db.User;
import IQueryOption from '../../interface/QueryOption.interface'
export default (queryOption: IQueryOption) => {
    return User.findAll(queryOption);
}