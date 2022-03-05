import { object, string, date, array, boolean, test } from "yup";

const blockModelSchema = object({

  
  
  Models: array().test(
    "num-talent_booked",
    "Talent booked cannot be empty",
    (value) => {
      return value.length > 0;
    }
  ),
 
 
 
  JobDates: array().test("shooting_date required", "Shooting date is required", (value) => {
    return value.filter(jobDate => jobDate.type === "shooting_date").length >  0 

  })
  

 
});

export function validateBlockModelForm(data) {
  return blockModelSchema.validate(data);
}
