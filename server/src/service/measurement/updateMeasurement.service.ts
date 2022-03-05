import IMeasurement from "../../interface/Measurement.interface";
import db from "../../model/index.model";
const Measurement = db.Measurement;

export default (measurement: IMeasurement, model_id: string) => {
    return Measurement.update(measurement, {where: {model_id: model_id}})
}