

import db from '../../model/index.model';
import IQueryOption from '../../interface/QueryOption.interface'
const Model = db.Model;
export default (model_id: string, queryOption?: IQueryOption) => {
    return Model.findOne({...queryOption, where: {...queryOption?.where, model_id: model_id}});
}