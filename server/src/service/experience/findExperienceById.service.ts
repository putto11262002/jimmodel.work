import db from "../../model/index.model";
const Experience = db.Experience;

export default (experience_id: string) => {
    return Experience.findOne({where: {
        experience_id: experience_id
    }})
}