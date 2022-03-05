import IMeasurement from '../../interface/Measurement.interface';
import db from '../../model/index.model';
const Measurement = db.Measurement;
export default (measurement: IMeasurement) => {
    return Measurement.create(measurement);
}