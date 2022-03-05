import { Model } from "sequelize";

export default interface ExperienceInstance extends Model {
  experience_id: string;
  model_id?: string;
  year?: Date;
  product?: string;
  country?: string;
  details?: string;
  media?: string;
}