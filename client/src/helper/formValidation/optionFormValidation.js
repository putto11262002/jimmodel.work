import { object, string, date, array, boolean, test } from "yup";

const optionSchema = object({
  client: string().required("Client cannot be empty."),
  client_address: string().required("CLient address cannot be empty."),
 
  title: string().required("Title cannot be empty."),
  Models: array().test(
    "num-talent_booked",
    "Talent booked cannot be empty",
    (value) => {
      return value.length > 0;
    }
  ),
  media_released: string().required("Media released cannot be empty."),

  territories_released: string(),
  shooting_start: date().required("Shooting start cannot be empty."),
  shooting_end: date().required("Shooting end cannot be empty."),
  working_hour: string().required("Working hour cannot be empty."),
  fitting_date: date().required("Fitting date cannot be empty."),

 
});

export function validateOptionForm(data) {
  return optionSchema.validate(data);
}
