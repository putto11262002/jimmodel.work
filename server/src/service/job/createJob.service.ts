import IJob from '../../interface/Job.interface';
import db from '../../model/index.model';
const Job = db.Job;

export default (job: any) => {
   
    return Job.create(job, {include: [{model:db.JobDate}]});
}