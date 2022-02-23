import {DataTypes, Sequelize} from 'sequelize';
import {v4 as uuidv4} from 'uuid';
export default (sequelize: Sequelize, dataTypes: typeof DataTypes ) => {
    const Job = sequelize.define('Job',  {
        job_id: {
            type: dataTypes.STRING,
            defaultValue: () => uuidv4(),
            primaryKey: true,  
        },
        client: {
            type: dataTypes.STRING,
        },
        client_address: {
            type: dataTypes.STRING,
        },
        person_in_charge: {
            type: dataTypes.STRING,
        },
        title: {
            type: dataTypes.STRING,
        },
        media_released: {
            type: dataTypes.STRING,
        },
        period_released: {
            type: dataTypes.STRING,
        },
        territories_released: {
            type: dataTypes.STRING,
        },
        shooting_start: {
            type: dataTypes.DATE,
        },
        shooting_end: {
            type: dataTypes.DATE,
        },
        fitting_date: {
            type: dataTypes.DATE
        },
        working_hour: {
            type: dataTypes.STRING,
        },
        venue_of_shoot: {
            type: dataTypes.STRING,
        },
        fee_as_agreed: {
            type: dataTypes.STRING,
        },
        overtime_per_hour: {
            type: dataTypes.STRING,
        },
        terms_of_payment: {
            type: dataTypes.STRING,
        },
        cancellation_fee: {
            type: dataTypes.STRING,
        },
        contract_details: {
            type: dataTypes.STRING(2000),
        },
        status: {
            type: dataTypes.BOOLEAN,
        },
        booked_by: {
            type: dataTypes.STRING
        }

    });

    return Job;
}