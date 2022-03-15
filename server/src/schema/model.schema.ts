import { object, string, number, date, boolean, bool, array } from "yup";
const ExperienceSchema = object({
  experience_id: string(),
  model_id: string(),
  year: string(),
  country: string(),
  product: string(),
  media: string(),
  details: string()
})

const MeasurementSchema = object({
  height: string(),
  weight: string(),
  chest_bust_cup: string(),
  collar: string(),
  around_armpit: string(),
  around_arm_to_wrist1: string(),
  around_arm_to_wrist2: string(),
  around_arm_to_wrist3: string(),
  arm_length1: string(),
  arm_length2: string(),
  around_thick_to_ankle: string(),
  trousers_length: string(),
  chest_height: string(),
  chest_width: string(),
  waist: string(),
  hips: string(),
  shoulder: string(),
  front_shoulder: string(),
  front_length: string(),
  back_shoulder: string(),
  back_length: string(),
  crotch: string(),
  bra_size: string(),
  suit_dress: string(),
  shoes_size: string(),
  eye_colour: string(),
  hair_colour: string(),
}
)
export const createModelSchema = object({
  body: object({
    model_id: string(),
    first_name: string().required("First name is a required field."),
    last_name: string().required("Last name is a required field."),
    nickname: string(),
    phone_number: string(),
    email: string()
      .email("Email must be a valid email."),
    line_id: string(),
    whatsApp: string(),
    weChat: string(),
    instagram: string(),
    facebook: string(),
    date_of_birth: date(),
    gender: string(),
    age: string(),
    nationality: string(),
    ethnicity: string(),
    country_of_residence: string(),
    spoken_language: string(),
    passport_no: string(),
    id_card: string(),
    tax_id: string(),
    occupation: string(),
    education: string(),
    address: string(),
    city: string(),
    zip_code: string(),
    country: string(),
    talent: string(),
    medical_background: string(),
    tattoo_scar: string(),
    underware_shooting: boolean(),
    in_town: boolean(),
    profile_img: string(),
    profile_img_file: object(),
    approve: boolean(),

    Measurement: MeasurementSchema,
    Experiences: array(ExperienceSchema)
  }),
  query: object({
    include: string(),
    filter: string(),
    fields: string(),
    limit: number(),
    offset: number(),
  }),
});

export const updateModelSchema = object({
  body: object({
    model_id: string(),
    first_name: string(),
    last_name: string(),
    phone_number: string(),
    email: string(),
    line_id: string(),
    whatsApp: string(),
    weChat: string(),
    instagram: string(),
    facebook: string(),
    date_of_birth: date(),
    gender: string(),
    age: string(),
    nationality: string(),
    ethnicity: string(),
    country_of_residence: string(),
    spoken_language: string(),
    passport_no: string(),
    id_card: string(),
    tax_id: string(),
    occupation: string(),
    education: string(),
    address: string(),
    city: string(),
    zip_code: string(),
    country: string(),
    talent: string(),
    medical_background: string(),
    tattoo_scar: boolean(),
    underware_shooting: boolean(),
    in_town: boolean(),
    profile_img: string(),
    approved: boolean(),
    Measurement: MeasurementSchema,

    Experiences: array(ExperienceSchema)
  }),
  query: object({
    include: string(),
    filter: string(),
    fields: string(),
    limit: number(),
    offset: number(),
  }),
});

export const findModelByIdSchema = object({
  query: object({
    include: string(),
    filter: string(),
    fields: string(),
    limit: number(),
    offset: number(),
  }),
});

export const findAllModelSchema = object({
  query: object({
    include: string(),
    filter: string(),
    fields: string(),
    limit: number(),
    offset: number(),
  }),
});

export const uploadModelProfileShema = object({
  param: object({
    image_number: number().moreThan(0).lessThan(6)
  })
})

export const searchModelSchema = object({
  query: object({
    include: string(),
    filter: string(),
    fields: string(),
    limit: number(),
    offset: number(),
  }),
});


