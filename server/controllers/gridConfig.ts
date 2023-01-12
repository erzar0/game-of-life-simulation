import { Response } from "express";
import { UserAuthInfoRequest } from "../types/UserAuthInfoRequest";
import mongoose from "mongoose";
import GridConfigModel from "../models/GridConfig";
import UserModel from "../models/User";
import JwtPayloadExtended from "../types/JwtPayloadExtended";

const getAll = async (req: UserAuthInfoRequest, res: Response) => {
  try {
    const configs = await GridConfigModel.find({}).exec();
    return res.json(configs);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
        error,
      });
    }
  }
  return res.json(null);
};

const getUserConfigs = async (req: UserAuthInfoRequest, res: Response) => {
  try {
    const user = await UserModel.findOne({
      username: (req.token as JwtPayloadExtended).username,
    })
      .populate("gridConfigs")
      .exec();
    return res.json(user?.gridConfigs);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
        error,
      });
    }
  }
};

const addGridConfig = async (req: UserAuthInfoRequest, res: Response) => {
  const token = req.token as JwtPayloadExtended;
  const username = token.username;
  const user = (await UserModel.find({ username }).exec())[0];
  try {
    const gridConfig = await GridConfigModel.create({
      ...req.body,
    });
    await gridConfig.save();

    const gridConfigId = gridConfig["_id"] as mongoose.Types.ObjectId;
    user.gridConfigs.push(gridConfigId);
    await user.save();

    return res.json(gridConfig);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
        error,
      });
    }
  }
};

export default { getAll, addGridConfig, getUserConfigs };
