import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    userEmail: String,
    password: String
}, { id: true });

const User = mongoose.model("User", UserSchema);

export default User;

