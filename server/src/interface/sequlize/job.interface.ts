import {Model} from 'sequelize'
export default interface JobInstance extends Model {
    job_id?: string,
    client?: string,
    client_address?: string,
    person_in_charge?: string,
    title: string,
    talent_booked: string,
    media_released?: string,
    period_released?: string,
    territories_released?: string,
    shooting_start: Date,
    shooting_end: Date,
    working_hour?: string,
    venue_of_shoot?: string,
    fee_as_agreed?: string,
    overtime_per_hour?: string,
    terms_of_payment?: string,
    cancellation_fee?: string,
    contract_details?: string,
    status: boolean,
    booked_by: string
}