import IJobDate from "../../interface/IJobDate.interface";
import db from "../../model/index.model";
const JobDate = db.JobDate
export default (jobDate: IJobDate) => {
    return JobDate.create(jobDate)
}