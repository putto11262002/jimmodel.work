import IJob from '../../interface/Job.interface';
import db from '../../model/index.model';
const Job = db.Job;

export default (job: IJob) => {
    return Job.create(job);
}