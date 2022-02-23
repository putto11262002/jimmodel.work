import db from "../../model/index.model";
import { QueryTypes } from "sequelize";
const sequelize = db.sequelize;

export default (searchTerm: string) => {
  let query = `SELECT model_id FROM Models LEFT OUTER JOIN (Jobs INNER JOIN model_job ) USING (model_id) WHERE first_name LIKE '${searchTerm}%' OR last_name LIKE '${searchTerm}%' 
    OR talent LIKE '%${searchTerm}%';`;

  return sequelize.query(query, { type: QueryTypes.SELECT });
};
