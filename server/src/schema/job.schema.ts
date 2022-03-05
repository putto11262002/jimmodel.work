
import { string, object, boolean, date, number, array } from "yup";

export const createJobSchema = object({
    body: object({
        job_id: string(),
        client: string(),
        client_address: string(),
        person_in_charge: string(),
        title: string(),
        talent_booked: array() ,
        media_released: string(),
        period_released: string(),
        territories_released: string(),
       
        working_hour: string(),
        venue_of_shoot: string(),
        fee_as_agreed: string(),
        overtime_per_hour: string(),
        terms_of_payment: string(),
        cancellation_fee: string(),
        contract_details: string(),
        status: boolean(),
        booked_by: string()
    }),
    query: object({
        include: string(),
        filter: string(),
        fields: string(),
        limit: number(),
        offset: number(),
      })
});

export const updateJobSchema =  object({
    body: object({
        job_id: string(),
        client: string(),
        client_address: string(),
        person_in_charge: string(),
        title: string(),
        talent_booked: string(),
        media_released: string(),
        period_released: string(),
        territories_released: string(),
     
        working_hour: string(),
        venue_of_shoot: string(),
        fee_as_agreed: string(),
        overtime_per_hour: string(),
        terms_of_payment: string(),
        cancellation_fee: string(),
        contract_details: string(),
        status: boolean(),
        booked_by: string()
    }),
    query: object({
        include: string(),
        filter: string(),
        fields: string(),
        limit: number(),
        offset: number(),
      }),

});

export const findJobByIdSchema = object({
    query: object({
        include: string(),
        filter: string(),
        fields: string(),
        limit: number(),
        offset: number(),
      }),
});

export const findAllJobsSchema = object({
    query: object({
        include: string(),
        filter: string(),
        fields: string(),
        limit: number(),
        offset: number(),
      }),
})

export const searchJobsSchema = object({
    query: object({
        include: string(),
        filter: string(),
        fields: string(),
        limit: number(),
        offset: number(),
      }),
});

export const findCalenderJobSchema = object({
    query: object({
       
        include: string(),
        filter: string(),
        fields: string(),
        limit: number(),
        offset: number(),
      }),
      param: object({
          from: date(),
          to: date()
      })
});



