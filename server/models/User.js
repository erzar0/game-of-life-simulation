"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    gridConfigs: {
        type: [mongoose_1["default"].SchemaTypes.ObjectId],
        ref: "GridConfig",
        "default": []
    }
});
UserSchema.set("toJSON", {
    transform: function (document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.hash;
        delete returnedObject.__v;
    }
});
exports["default"] = mongoose_1["default"].model("User", UserSchema);
