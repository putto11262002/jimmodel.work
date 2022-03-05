import db from "../../model/index.model";
const User = db.User;

export default (user_id: string) => {
    return User.destroy({where: {
        user_id: user_id
    }});
}