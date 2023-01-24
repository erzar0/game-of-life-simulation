"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var cfg_1 = require("./config/cfg");
var user_1 = require("./routes/user");
var gridConfig_1 = require("./routes/gridConfig");
var cors_1 = require("cors");
mongoose_1["default"].set("strictQuery", false);
var conn = mongoose_1["default"]
    .connect(cfg_1.MONGODB_URI)
    .then(function () { return console.log("Connected to database"); })["catch"](function (error) {
    console.log("Connection to database failed");
    console.log(error);
});
var app = (0, express_1["default"])();
app.use((0, cors_1["default"])());
app.use(express_1["default"].json());
app.use("/user", user_1["default"]);
app.use("/grid-config", gridConfig_1["default"]);
app.get("/", function (req, res) {
    res.send("Health check");
});
//
app.listen(cfg_1.PORT, function () {
    console.log("[server]: Server is running at http://localhost:".concat(cfg_1.PORT));
});
