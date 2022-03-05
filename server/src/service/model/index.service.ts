import { Model } from 'sequelize';
import createModel from './createModel.service';
import findAllModel from './findAllModel.service';
import findOneById from './findModelById.service';
import updateOneById from './updateModelById.service';
import deleteOneById from './deleteModelById.service';
import searchAll from './searchModel.service';

const modelService = {
    create: createModel,
    findAll: findAllModel,
    findOneById: findOneById,
    updateOneById: updateOneById,
    deleteOneById: deleteOneById,
    seachAll: searchAll
}
export default modelService