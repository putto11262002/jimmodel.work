import IJobDate from "../../interface/IJobDate.interface";
import db from "../../model/index.model";
import IQueryOption from '../../interface/QueryOption.interface'
const JobDate = db.JobDate
export default (id?: string) => {
    return JobDate.destroy({where: {id: id}})
}