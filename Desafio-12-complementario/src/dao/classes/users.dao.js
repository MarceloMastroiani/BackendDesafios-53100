import UserModel from "../models/users.js";

export default class Users {
  constructor() {
    console.log("Trabajando con users.dao");
  }
  getAll = async () => {
    return await UserModel.find().lean();
  };

  getById = async (id) => {
    return await UserModel.findOne({ _id: id }).lean();
  };

  //   async getByProperty(property, name) {
  //     let opts = {};
  //     opts[property] = name;
  //     let result = await UserModel.findOne(opts).lean();
  //     return result;
  //   }

  create = async (user) => {
    return await UserModel.create(user);
  };

  update = async (id, userList) => {
    return await UserModel.updateOne({ _id: id }, userList);
  };

  delete = async (id) => {
    return await UserModel.deleteOne({ _id: id });
  };
}
