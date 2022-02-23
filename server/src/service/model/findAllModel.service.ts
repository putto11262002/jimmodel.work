import { QueryInterfaceOptions } from 'sequelize';
import { QueryInterface } from 'sequelize';
import db from '../../model/index.model';
const Model = db.Model;
import IQueryOption from '../../interface/QueryOption.interface'

export default (queryOptions?: IQueryOption) => {
    return Model.findAll(queryOptions)
}