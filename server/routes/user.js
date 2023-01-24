"use strict";
exports.__esModule = true;
var express_1 = require("express");
var user_1 = require("../controllers/user");
var isAuth_1 = require("../middleware/isAuth");
var router = express_1["default"].Router();
router.get("/validate-token", isAuth_1.isAuth, user_1["default"].validateToken);
router.post("/register", user_1["default"].register);
router.post("/login", user_1["default"].login);
router.get("/get/all", user_1["default"].getAllUsers);
exports["default"] = router;
//
