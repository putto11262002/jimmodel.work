import db from "../../model/index.model";
const Measurement = db.Measurement;

export default (model_id: string) => {
    return Measurement.destroy({where: {model_id: model_id}})
}