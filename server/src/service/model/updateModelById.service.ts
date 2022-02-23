import IModel from '../../interface/Model.interface';
import db from '../../model/index.model';

const Model = db.Model;

export default (model_id: string, model: IModel) => {
    
        return  Model.update(model, {where: {
            model_id: model_id}})
       
}