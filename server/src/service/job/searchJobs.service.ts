import db from '../../model/index.model';
import {QueryTypes} from 'sequelize'
const sequelize = db.sequelize;

export default (searchTerm: string) => {
    let query = `SELECT job_id FROM Jobs LEFT OUTER JOIN ( model_job  INNER JOIN Models USING (model_id)) USING (job_id) LEFT OUTER JOIN Users ON (booked_by = user_id) WHERE title LIKE '${searchTerm}%' OR Models.first_name LIKE '%${searchTerm}%' OR Models.last_name LIKE '%${searchTerm}%';`
   
    return sequelize.query( query, {type: QueryTypes.SELECT});
}
