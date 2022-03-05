import { Sequelize, DataTypes } from "sequelize";
import MeasurementInstance from '../interface/sequlize/measurement.interface';
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    const Measurement = sequelize.define('Measurement', {
        model_id: {
            type: dataTypes.STRING,
            primaryKey: true,
          },
        height: {
            type: dataTypes.STRING,
          },
          weight: {
            type: dataTypes.STRING,
          },
          chest_bust_cup: {
            type: dataTypes.STRING,
          },
          collar: {
            type: dataTypes.STRING,
          },
          around_armpit: {
            type: dataTypes.STRING,
          },
          around_arm_to_wrist1: {
            type: dataTypes.STRING,
          },
          around_arm_to_wrist2: {
            type: dataTypes.STRING,
          },
          around_arm_to_wrist3: {
            type: dataTypes.STRING,
          },
          arm_length1: {
            type: dataTypes.STRING,
          },
          arm_length2: {
            type: dataTypes.STRING,
          },
          around_thick_to_ankle: {
            type: dataTypes.STRING,
          },
          trousers_length: {
            type: dataTypes.STRING,
          },
      
          chest_height: {
            type: dataTypes.STRING,
          },
          chest_width: {
            type: dataTypes.STRING,
          },
          waist: {
            type: dataTypes.STRING,
          },
          hips: {
            type: dataTypes.STRING,
          },
          shoulder: {
            type: dataTypes.STRING,
          },
          front_shoulder: {
            type: dataTypes.STRING,
          },
          front_length: {
            type: dataTypes.STRING,
          },
          back_shoulder: {
            type: dataTypes.STRING,
          },
          back_length: {
            type: dataTypes.STRING,
          },
          crotch: {
            type: dataTypes.STRING,
          },
          bra_size: {
            type: dataTypes.STRING,
          },
          suit_dress: {
            type: dataTypes.STRING,
          },
          shoes_size: {
            type: dataTypes.STRING,
          },
          eye_colour: {
            type: dataTypes.STRING,
          },
          hair_colour: {
            type: dataTypes.STRING,
          }
    })
    return Measurement;
}
