import db from "../../model/index.model";
const Model = db.Model;
import IModel from "../../interface/Model.interface";

export default async(model: IModel) => {
        return Model.create(model);
    
}