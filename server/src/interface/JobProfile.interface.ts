import IModel from "./Model.interface";
import IUser from "./User.interface";
import IJob from "./Job.interface";

export default interface IJobProfile extends IJob {
    User: IUser;
    Model: IModel
}