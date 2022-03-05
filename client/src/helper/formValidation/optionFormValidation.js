import { object, string, date, array, boolean, test } from "yup";

const optionSchema = object({
  client: string().required("Client cannot be empty."),
  
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
 
  working_hour: string().required("Working hour cannot be empty."),
  JobDates: array().test("shooting_date required", "Shooting date is required", (value) => {
    return value.filter(jobDate => jobDate.type === "shooting_date").length >  0 

  })
  

 
});

export function validateOptionForm(data) {
  return optionSchema.validate(data);
}
