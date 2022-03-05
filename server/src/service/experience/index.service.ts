import createExperienceService from "./createExperience.service";
import deleteExperienceService from "./deleteExperience.service";
import findExperienceByIdService from "./findExperienceById.service";
import updateExperienceService from "./updateExperience.service";

export default {
    createExperience: createExperienceService,
    deleteExperience: deleteExperienceService,
    updateExperience: updateExperienceService,
    findExperienceById: findExperienceByIdService
}