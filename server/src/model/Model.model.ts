import {DataTypes, Sequelize} from "sequelize";
import ModelInstance from '../interface/sequlize/model.interface';
import {v4 as uuidv4} from 'uuid'
export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    const Model = sequelize.define("Model", {
      model_id: {
        type: dataTypes.STRING,
        defaultValue: () => uuidv4(),
        primaryKey: true,
      },
      first_name: {
        type: dataTypes.STRING,
      },
      last_name: {
        type: dataTypes.STRING,
      },
      phone_number: {
        type: dataTypes.STRING,
      },
      email: {
        type: dataTypes.STRING,
      },
      line_id: {
        type: dataTypes.STRING,
      },
      whatsApp: {
        type: dataTypes.STRING,
      },
      weChat: {
        type: dataTypes.STRING,
      },
      instagram: {
        type: dataTypes.STRING,
      },
      facebook: {
        type: dataTypes.STRING,
      },
      date_of_birth: {
        type: dataTypes.DATEONLY,
      },
      gender: {
        type: dataTypes.STRING,
      },
      age: {
        type: dataTypes.INTEGER,
      },
  
      nationality: {
        type: dataTypes.STRING,
      },
      ethnicity: {
        type: dataTypes.STRING,
      },
      country_of_residence: {
        type: dataTypes.STRING,
      },
      spoken_language: {
        type: dataTypes.STRING,
      },
      passport_no: {
        type: dataTypes.STRING,
      },
      id_card: {
        type: dataTypes.STRING,
      },
      tax_id: {
        type: dataTypes.STRING,
      },
      occupation: {
        type: dataTypes.STRING,
      },
      education: {
        type: dataTypes.STRING,
      },
      address: {
        type: dataTypes.STRING,
      },
      city: {
        type: dataTypes.STRING,
      },
      zip_code: {
        type: dataTypes.STRING,
      },
      country: {
        type: dataTypes.STRING,
      },
      experience: {
        type: dataTypes.STRING(2000),
      },
      talent: {
        type: dataTypes.STRING(2000),
      },
      medical_background: {
        type: dataTypes.STRING,
      },
      tattoo_scar: {
        type: dataTypes.BOOLEAN,
      },
      underware_shooting: {
        type: dataTypes.BOOLEAN,
      },
      in_town: { type: dataTypes.BOOLEAN },
      
      profile_img_1: {
        type: dataTypes.STRING(300),
      },
      profile_img_2: {
        type: dataTypes.STRING(300),
      },
      profile_img_3: {
        type: dataTypes.STRING(300),
      },
      profile_img_4: {
        type: dataTypes.STRING(300),
      },
      profile_img_5: {
        type: dataTypes.STRING(300),
      },
      profile_img_6: {
        type: dataTypes.STRING(300),
      },
      emergency_contact_name: {
        type: dataTypes.STRING,
      },
      emergency_contact_details: {
        type: dataTypes.STRING,
      },
      emergency_contact_relationship: {
        type: dataTypes.STRING,
      },

      approved: {
        type: dataTypes.BOOLEAN,
        defaultValue: false
      }
    });
    return Model;
  };
  