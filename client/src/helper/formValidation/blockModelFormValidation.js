import { object, string, date, array, boolean, test } from "yup";

const blockModelSchema = object({

  
  
  Models: array().test(
    "num-talent_booked",
    "Talent booked cannot be empty",
    (value) => {
      return value.length > 0;
    }
  ),
 
 
 
  JobDates: array().test("block_model required", "Block model date is required", (value) => {
    return value.filter(jobDate => jobDate.type === "block_model_date").length >  0 

  })
  

 
});

export function validateBlockModelForm(data) {
  return blockModelSchema.validate(data);
}
