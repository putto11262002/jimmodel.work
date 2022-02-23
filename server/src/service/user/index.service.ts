import createUserService from "./createUser.service";
import deleteUserByIdService from "./deleteUserById.service";
import findOneByUsernameService from "./findUserByUsername.service";
import findAllUsersService from "./findUsers.service"
import findUserByIdService from "./findUserById.service";
import updateUserByIdService from "./updateUserById.service";

export default {
    createUser: createUserService,
    deleteUserById: deleteUserByIdService,
    findAllUsers: findAllUsersService,
    findUserById: findUserByIdService,
    updateUserById: updateUserByIdService,
    findUserByUsername: findOneByUsernameService
}