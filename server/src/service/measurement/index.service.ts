import createMeasurementService from "./createMeasurement.service";
import deleteMeasurementService from "./deleteMeasurement.service";
import updateMeasurementService from "./updateMeasurement.service";

export default {
    createMeasurement: createMeasurementService,
    updateMeasurement: updateMeasurementService,
    deleteMeasurement: deleteMeasurementService
}