import db from "../../model/index.model";
const Job = db.Job;
import IQueryOption from '../../interface/QueryOption.interface';
export default (queryOption?: IQueryOption) => {
    return Job.findAll(queryOption);
}