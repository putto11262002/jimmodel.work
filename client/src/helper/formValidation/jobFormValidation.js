import { object, string, date , array, boolean, test} from "yup";

const jobSchema = object({
   
    client: string().required("Client cannot be empty."),
    client_address: string().required("CLient address cannot be empty."),
    person_in_charge: string().required("Person in charge cannot be empty."),
    title: string().required("Title cannot be empty."),
   Models: array().test('num-talent_booked', "Talent booked cannot be empty", (value) => {
       return value.length > 0
    }) ,
    media_released: string().required("Media released cannot be empty."),
    period_released: string().required("Period released cannot be empty."),
    territories_released: string().required("Territories released cannot be empty."),
    shooting_start: date().required("Shooting start cannot be empty."),
    shooting_end: date().required("Shooting end cannot be empty."),
    working_hour: string().required("Working hour cannot be empty."),
    fitting_date: date().required("Fitting date cannot be empty."),
    venue_of_shoot: string().required("Venue of shooting cannot be empty."),
    fee_as_agreed: string().required("Fee as agreed cannot be empty."),
    overtime_per_hour: string().required("Overtime per hour cannot be empty."),
    terms_of_payment: string().required("Terms of payment cannot be empty."),
    cancellation_fee: string().required("Cancellation fee cannot be empty."),
    contract_details: string().required("Contract details cannot be empty."),
  
})

export  function validateJobForm(data) {
    return jobSchema
      .validate(data)
      
  }