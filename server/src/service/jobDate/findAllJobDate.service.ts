import db from "../../model/index.model";
const JobDate = db.JobDate
import IQueryOption from '../../interface/QueryOption.interface';
import { Op } from "sequelize";
export default (queryOption?: IQueryOption) => {
    return JobDate.findAll(queryOption);
}