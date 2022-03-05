import { Request, Response } from "express";
import IQueryOption from "../../interface/QueryOption.interface";
import db from "../../model/index.model";
const Job = db.Job;
const Model = db.Model;
const User = db.User
const Experience = db.Experience
export default (
  req: Request,
  res: Response,
  defaultQueryOptions: IQueryOption
): any => {
  const QueryOptions: IQueryOption = defaultQueryOptions;
  if (req.query.limit !== undefined) {
    try {
      const limit: number = Number(req.query.limit);
      QueryOptions.limit = limit;
    } catch (err) {
      res.json("limit must be an integer");
    }
  }
  if (req.query.offset !== undefined) {
    try {
      const offset: number = Number(req.query.offset);
      QueryOptions.offset = offset;
    } catch (err) {
      res.json("offset must be an integer");
    }
  }
  if (req.query.order !== undefined) {
    const orders: Array<any> = String(req.query.order).split(",");
    for (let key in orders) {
      let order = orders[key];
      let splitedOrder: Array<String> = order.split(":");

      if (order.length > 1) {
        splitedOrder[1] =
          splitedOrder[1].toUpperCase() === "DESC" ? "DESC" : "ASC";
      }
      orders[key] = splitedOrder;
    }
    (orders);
    QueryOptions.order = orders;
  }

  if (req.query.include !== undefined) {
    const tables: Array<string> = String(req.query.include).split(",");
    const include: Array<any> = Array();
    for (let table of tables) {
      const model: string = table.charAt(0).toUpperCase() + table.substring(1);
      try {
        include.push(model === 'Model' ?{ model: eval(model), as: 'Models', required: false } : { model: eval(model), required: false });
      } catch (err) {
        return res.status(400).json(`${model} is an invalid table name`);
      }
    }
    QueryOptions.include = include;
  }
  if (req.query.attributes !== undefined) {
    QueryOptions.attributes =[...QueryOptions.attributes as Array<any>,  ...String(req.query.attributes).split(",")]
  }


  return QueryOptions;
};
