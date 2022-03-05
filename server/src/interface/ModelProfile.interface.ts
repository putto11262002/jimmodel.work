import IModel from "./Model.interface";
import IMeasurement from "./Measurement.interface";
import IExperience from "./Experience.interface";

export default interface IModelProfile extends IModel {
    Measurement: IMeasurement;
    Experiences: Array<IExperience>;

}