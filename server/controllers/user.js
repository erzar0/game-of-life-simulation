"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var bcryptjs_1 = require("bcryptjs");
var User_1 = require("../models/User");
var signJWT_1 = require("../utils/signJWT");
var validateToken = function (req, res, next) {
    return res.status(200).json({ message: "Authorized" });
};
var register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, users, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, username = _a.username, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, User_1["default"].find({ username: username }).exec()];
            case 2:
                users = _b.sent();
                if (users.length > 0) {
                    return [2 /*return*/, res
                            .status(409)
                            .json({ message: "User with this username already exists!" })];
                }
                bcryptjs_1["default"].hash(password, 10, function (error, hash) { return __awaiter(void 0, void 0, void 0, function () {
                    var newUser, error_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (error) {
                                    return [2 /*return*/, res.status(500).json({
                                            message: error.message,
                                            error: error
                                        })];
                                }
                                newUser = new User_1["default"]({
                                    username: username,
                                    hash: hash
                                });
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, newUser.save()];
                            case 2:
                                _a.sent();
                                return [2 /*return*/, res.status(201).json({ user: newUser })];
                            case 3:
                                error_2 = _a.sent();
                                if (error_2 instanceof Error) {
                                    return [2 /*return*/, res.status(500).json({
                                            message: error_2.message,
                                            error: error_2
                                        })];
                                }
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 4];
            case 3:
                error_1 = _b.sent();
                if (error_1 instanceof Error) {
                    return [2 /*return*/, res.status(500).json({
                            message: error_1.message,
                            error: error_1
                        })];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var login = function (req, res, next) {
    var _a = req.body, username = _a.username, password = _a.password;
    User_1["default"].find({ username: username })
        .exec()
        .then(function (users) {
        var user = users[0];
        if (user.hash) {
            bcryptjs_1["default"].compare(password, user.hash, function (error, result) {
                if (error) {
                    return res.status(401).json({ message: "Unauthorized" });
                }
                else if (result) {
                    (0, signJWT_1["default"])(users[0], function (_error, token) {
                        if (_error) {
                            return res
                                .status(401)
                                .json({ message: "Unauthorized", error: _error });
                        }
                        else if (token) {
                            return res.status(200).json({
                                message: "Authorization successful",
                                token: token
                            });
                        }
                    });
                }
            });
        }
    })["catch"](function (error) {
        return res.status(500).json({ message: error.message, error: error });
    });
};
var getAllUsers = function (req, res, next) {
    User_1["default"].find()
        .select("-passowrd")
        .populate("gridConfigs")
        .exec()
        .then(function (users) {
        return res.status(200).json({ users: users });
    })["catch"](function (error) {
        return res.status(500).json({
            message: error.message,
            error: error
        });
    });
};
var controller = { validateToken: validateToken, register: register, login: login, getAllUsers: getAllUsers };
exports["default"] = controller;
