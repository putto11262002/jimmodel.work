import IJob from "../../interface/Job.interface";
import db from "../../model/index.model";
const Job = db.Job;

export default (job_id: string, updatedJob: IJob) => {
    return Job.update(updatedJob, {where: {
        job_id: job_id
    },
    include: [{model: db.JobDate}]
});
}