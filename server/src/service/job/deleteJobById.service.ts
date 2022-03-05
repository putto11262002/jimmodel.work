import db from "../../model/index.model";
const Job = db.Job;
export default (job_id: string) => {
    return Job.destroy({where: {job_id: job_id}});
}