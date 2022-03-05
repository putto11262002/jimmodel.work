import IExperience from "../../interface/Experience.interface";
import db from "../../model/index.model";
const Experience = db.Experience;
export default (experience: IExperience, experience_id: string) => {
    return Experience.update(experience, {
        where: {
            experience_id: experience_id
        }
    })
}