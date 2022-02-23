import db from '../../model/index.model';
const Model = db.Model;

export default (model_id: string) => {
    return Model.destroy({where: {
        model_id: model_id
    }})

}