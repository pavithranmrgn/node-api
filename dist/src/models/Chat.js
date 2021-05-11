"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var ChatSchema = new Schema({
    message: String,
    recieverId: { type: String, ref: "User" },
    senderId: { type: String, ref: "User" },
    isDeleteRecieverOnly: Boolean,
    isDeleteSenderOnly: Boolean,
    createdDate: Date,
}, { id: true });
var Chat = mongoose_1.default.model("Chat", ChatSchema);
exports.default = Chat;
//# sourceMappingURL=Chat.js.map