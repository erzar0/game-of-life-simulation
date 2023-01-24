"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
var cfg_1 = require("../config/cfg");
var signJWT = function (user, callback) {
    var expiresIn = "1d";
    try {
        jsonwebtoken_1["default"].sign({ username: user.username, id: user.id }, cfg_1.SECRET, { expiresIn: expiresIn }, function (error, token) {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                callback(null, token);
            }
        });
    }
    catch (error) {
        console.error(error.message, error);
        callback(error, null);
    }
};
exports["default"] = signJWT;
