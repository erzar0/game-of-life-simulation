import { NextFunction, Response } from "express";
import { UserAuthInfoRequest } from "../types/UserAuthInfoRequest";
import bycryptjs from "bcryptjs";
import mongoose from "mongoose";
import UserModel from "../models/User";
import signJWT from "../utils/signJWT";
import User from "../types/User";

const validateToken = (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  return res.status(200).json({ message: "Authorized" });
};

const register = async (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  try {
    const users = await UserModel.find({ username }).exec();
    if (users.length > 0) {
      return res
        .status(409)
        .json({ message: "User with this username already exists!" });
    }
    bycryptjs.hash(password, 10, async (error: Error, hash) => {
      if (error) {
        return res.status(500).json({
          message: error.message,
          error,
        });
      }
      const newUser: User = new UserModel({
        username,
        hash,
      });
      try {
        await newUser.save();
        return res.status(201).json({ user: newUser });
      } catch (error) {
        if (error instanceof Error) {
          return res.status(500).json({
            message: error.message,
            error,
          });
        }
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        message: error.message,
        error,
      });
    }
  }
};

const login = (req: UserAuthInfoRequest, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  UserModel.find({ username })
    .exec()
    .then((users) => {
      if (users.length !== 1) {
        return res.status(500).end();
      }

      bycryptjs.compare(password, users[0].hash, (error, result) => {
        if (error) {
          return res.status(401).json({ message: "Unauthorized" });
        } else if (result) {
          signJWT(users[0], (_error, token) => {
            if (_error) {
              return res
                .status(401)
                .json({ message: "Unauthorized", error: _error });
            } else if (token) {
              return res.status(200).json({
                message: "Authorization successful",
                token,
              });
            }
          });
        }
      });
    })
    .catch((error) => {
      return res.status(500).json({ message: error.message, error });
    });
};

const getAllUsers = (
  req: UserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  UserModel.find()
    .select("-passowrd")
    .exec()
    .then((users) => {
      return res.status(200).json({ users });
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};
const controller = { validateToken, register, login, getAllUsers };
export default controller;
