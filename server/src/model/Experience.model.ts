import {DataTypes, Sequelize} from 'sequelize';
import {v4 as uuidv4} from 'uuid'


export default (sequelize: Sequelize, dataTypes: typeof DataTypes ) => {
    const Experience = sequelize.define('Experience',  {
        experience_id: {
            type: dataTypes.STRING,
            primaryKey: true,
            defaultValue: () => uuidv4()
        },
        model_id: {
            type: dataTypes.STRING,
            
        },
        year: {
            type: dataTypes.DATE
        },
        media: {
            type: dataTypes.STRING
        },
        product: {
            type: dataTypes.STRING
        },
        country: {
            type: dataTypes.STRING
        },
        details: {
            type: dataTypes.STRING
        }
    });

    return Experience;
}