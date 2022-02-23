import IExperience from "../../interface/Experience.interface";
import db from "../../model/index.model";
const Experience = db.Experience;

export default (experience: IExperience) => {
    return Experience.create(experience);
}