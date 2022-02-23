import { object, string, number } from "yup";

export const createUserSchema = object({
  body: object({
    user_id: string(),
    first_name: string(),
    last_name: string(),
    username: string(),
    password: string(),
    email: string(),
    profile_img: string(),
    profile_img_file: object(),
    colour: string(),
    role: string(),
  }),
  query: object({
    include: string(),
    filter: string(),
    fields: string(),
    limit: number(),
    offset: number(),
  }),
});

export const updateUserSchema = object({
  body: object({
    user_id: string(),
    first_name: string(),
    last_name: string(),
    username: string(),
    password: string(),
    email: string(),
    profile_img: string(),
    profile_img_file: object(),
    colour: string(),
    role: string(),
  }),
  query: object({
    include: string(),
    filter: string(),
    fields: string(),
    limit: number(),
    offset: number(),
  }),
});

export const findAllUserSchema = object({

  query: object({
    include: string(),
    filter: string(),
    fields: string(),
    limit: number(),
    offset: number(),
  }),
});

export const findUserByIdSchema = object({
    query: object({
        include: string(),
        filter: string(),
        fields: string(),
        limit: number(),
        offset: number(),
      }),
});

export const searchUserSchema =  object({
    query: object({
        include: string(),
        filter: string(),
        fields: string(),
        limit: number(),
        offset: number(),
      }),
});