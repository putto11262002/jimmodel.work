import { object, string, date , array, boolean, test} from "yup";

const jobSchema = object({
   
    client: string().nullable().required("Client cannot be empty."),
    client_address: string().nullable().required("CLient address cannot be empty."),
    person_in_charge: string().nullable().required("Person in charge cannot be empty."),
    title: string().nullable().required("Title cannot be empty."),
   Models: array().test('num-talent_booked', "Talent booked cannot be empty", (value) => {
       return value.length > 0
    }) ,
    media_released: string().nullable().required("Media released cannot be empty."),
    period_released: string().nullable().required("Period released cannot be empty."),
    territories_released: string().nullable().required("Territories released cannot be empty."),
   
    working_hour: string().nullable().required("Working hour cannot be empty."),
    
    venue_of_shoot: string().nullable().required("Venue of shooting cannot be empty."),
    fee_as_agreed: string().nullable().required("Fee as agreed cannot be empty."),
    overtime_per_hour: string().nullable().required("Overtime per hour cannot be empty."),
    terms_of_payment: string().nullable().required("Terms of payment cannot be empty."),
    cancellation_fee: string().nullable().required("Cancellation fee cannot be empty."),
    contract_details: string().nullable().required("Contract details cannot be empty."),
    JobDates: array().test("shooting_date required", "Shooting date is required", (value) => {
        return value.filter(jobDate => jobDate.type === "shooting_date").length >  0 
    
      })
      
  
})

export  function validateJobForm(data) {
    return jobSchema
      .validate(data)
      
  }