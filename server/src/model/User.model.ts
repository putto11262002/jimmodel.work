import {Sequelize, DataTypes} from 'sequelize';
import {v4 as uuidv4} from 'uuid';
import UserInstance from '../interface/sequlize/user.interface';
export default (sequelize : Sequelize, dataTypes: typeof DataTypes ) => {
    const User = sequelize.define('User', {
        user_id: {
            type: dataTypes.STRING,
            primaryKey: true,
            defaultValue: () => uuidv4()
        },
        first_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        username: {
            type: dataTypes.STRING,
            allowNull: false,  
        },
        password: {
            type: dataTypes.STRING,
        },
        email: {
            type: dataTypes.STRING
        },
        profile_img: {
            type: dataTypes.STRING
        },
        colour: {
            type: dataTypes.STRING
        },
        role: {
            type: dataTypes.STRING
        }
    });
    return User;
};