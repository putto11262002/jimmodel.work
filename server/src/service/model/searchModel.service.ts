import db from "../../model/index.model";
import { QueryTypes } from "sequelize";
const sequelize = db.sequelize;

export default (searchTerm: string, approved: boolean=true) => {
  let query = `SELECT model_id FROM Models WHERE first_name LIKE '%${searchTerm}%' OR last_name LIKE '%${searchTerm}%' 
    OR nickname LIKE '%${searchTerm}%' AND approved = ${approved ? 'TRUE' : 'FALSE'};`;

  return sequelize.query(query, { type: QueryTypes.SELECT });
};
