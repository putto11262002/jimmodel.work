import {DataTypes, Sequelize} from "sequelize";

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
    const ModelProfileImage = sequelize.define("ModelProfileImage", {
      model_id: {
        type: dataTypes.STRING,
        primaryKey: true,
      },
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

    });
    return ModelProfileImage;
  };
  