import createJobDateService from "./createJobDate.service";
import deleteJobDateService from "./deleteJobDate.service";
import deleteJobDateByIdService from "./deleteJobDateById.service";
import findAllJobDateService from "./findAllJobDate.service";
import updateJobDateByIdService from "./updateJobDateById.service";

export default {
    createJobDate: createJobDateService,
    deleteJobDateById: deleteJobDateByIdService,
    deleteJobDate: deleteJobDateService,
    updateJobDateById: updateJobDateByIdService,
    findAllJobDates: findAllJobDateService
}