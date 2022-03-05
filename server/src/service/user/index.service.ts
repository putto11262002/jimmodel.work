import createUserService from "./createUser.service";
import deleteUserByIdService from "./deleteUserById.service";
import findOneByUsernameService from "./findUserByUsername.service";
import findUsersService from "./findUsers.service";
import findUserByIdService from "./findUserById.service";
import updateUserByIdService from "./updateUserById.service";

export default {
    createUser: createUserService,
    deleteUserById: deleteUserByIdService,
    findAllUsers: findUsersService,
    findUserById: findUserByIdService,
    updateUserById: updateUserByIdService,
    findUserByUsername: findOneByUsernameService
}