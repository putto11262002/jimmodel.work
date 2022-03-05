import IJobDate from "../../interface/IJobDate.interface";
import db from "../../model/index.model";
const JobDate = db.JobDate
export default (id:string, jobDate: IJobDate) => {
    return JobDate.update(jobDate, {where:{ id: id}})
}