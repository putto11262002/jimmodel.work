import db from "../../model/index.model";
const Job = db.Job;
import IQueryOption from '../../interface/QueryOption.interface';

export default (job_id: string, queryOption?: IQueryOption) => {
    return Job.findOne({...queryOption, where: {...queryOption?.where, job_id: job_id}}
    );
}