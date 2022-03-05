import createJobService from "./createJob.service";
import deleteJobByIdService from "./deleteJobById.service";
import findAllJobsService from "./findAllJobs.service";
import findJobByIdService from "./findJobById.service";
import searchJobsService from "./searchJobs.service";
import updateJobByIdService from "./updateJobById.service";


export default {
    createJob: createJobService,
    findJobById: findJobByIdService,
    findAllJobs: findAllJobsService,
    updateJobById: updateJobByIdService,
    deleteJobById: deleteJobByIdService,
    searchJobs: searchJobsService
}