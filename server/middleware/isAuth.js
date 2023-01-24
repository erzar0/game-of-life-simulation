"use strict";
exports.__esModule = true;
exports.isAuth = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var cfg_1 = require("../config/cfg");
var isAuth = function (req, res, next) {
    var authorization = req.headers.authorization;
    if (authorization) {
        var token = authorization.split(" ")[1];
        jsonwebtoken_1["default"].verify(token, cfg_1.SECRET, function (error, token) {
            if (error) {
                return res.status(403).end();
            }
            else if (token) {
                req.token = token;
                next();
            }
        });
    }
    else {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
exports.isAuth = isAuth;
