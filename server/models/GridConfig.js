"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var CellSchema = new mongoose_1["default"].Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true }
}, { _id: false });
var GridConfigSchema = new mongoose_1.Schema({
    enabledCells: [CellSchema],
    gridSize: {
        width: { type: Number, required: true },
        height: { type: Number, required: true }
    },
    name: { type: String, required: true }
});
GridConfigSchema.set("toJSON", {
    transform: function (document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
exports["default"] = mongoose_1["default"].model("GridConfig", GridConfigSchema);
