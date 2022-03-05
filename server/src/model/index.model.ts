import { Sequelize, DataTypes} from "sequelize";
import config from "../config";

import Model from './Model.model';
import User from './User.model';
import Measurement from "./Measurement.model";
import Job from './Job.model';
import Experience from './Experience.model';
import JobDate from "./JobDate.model";

const sequelize = new Sequelize(
  config.sequelize.name,
  config.sequelize.user,
  config.sequelize.password,

  {
    host: config.sequelize.host,
    dialect: config.sequelize.dialect,
    
    
  }
);

const db: any = {}

db.sequelize = sequelize;
db.Model = Model(sequelize, DataTypes);
db.User = User(sequelize, DataTypes);
db.Measurement = Measurement(sequelize, DataTypes);
db.Job = Job(sequelize, DataTypes);
db.Experience = Experience(sequelize, DataTypes);
db.JobDate = JobDate(sequelize, DataTypes);

// table associations
db.Model.belongsToMany(db.Job, {through: "model_job", as: 'Jobs', foreignKey: 'model_id'});
db.Job.belongsToMany(db.Model, {through: 'model_job', as: 'Models', foreignKey: 'job_id'});
db.Model.hasMany(db.Experience, {foreignKey: 'model_id', targetKey: 'model_id'});
db.Experience.belongsTo(db.Model, {foreignKey: 'model_id', targetKey: 'model_id'});
db.Model.hasOne(db.Measurement, {foreignKey: 'model_id', targetKey: 'model_id'});
db.User.hasMany(db.Job, {foreignKey: 'booked_by', targetKey: 'user_id'});
db.Job.belongsTo(db.User, {foreignKey: 'booked_by', targetKey: 'user_id'});
db.Job.hasMany(db.JobDate, {foreignKey: 'job_id', targetKey: 'job_id'});
db.JobDate.belongsTo(db.Job, {foreignKey: 'job_id', targetKey: 'job_id'});
export default db;

