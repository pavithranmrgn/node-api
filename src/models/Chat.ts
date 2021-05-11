import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var ChatSchema = new Schema({
    message: String,
    recieverId: { type: String, ref: "User" },
    senderId: { type: String, ref: "User" },
    isDeleteRecieverOnly: Boolean,
    isDeleteSenderOnly: Boolean,
    createdDate: Date,
}, { id: true });

const Chat = mongoose.model("Chat", ChatSchema);

export default Chat;

