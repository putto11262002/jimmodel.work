import {DataTypes, Sequelize} from 'sequelize';



export default (sequelize: Sequelize, dataTypes: typeof DataTypes ) => {
    const JobDate = sequelize.define('JobDate',  {
       job_id: {
           type: dataTypes.STRING,
           allowNull: false
       },
       date: {
           type: dataTypes.DATE,
           allowNull: false
       },
       type: {
           type: dataTypes.STRING,
           allowNull: false
       }
    });

    return JobDate;
}