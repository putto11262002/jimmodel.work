export default interface IUser {
    user_id?: string,
    first_name: string,
    last_name: string,
    username: string,
    password: string,
    email?: string,
    profile_img?: string,
    colour?: string,
    role: string
}