var bcrypt = require('bcryptjs');
import jwt from 'jsonwebtoken';

import User from "../models/User";
import { config } from '../config/config';

export class UserService {

    async getUsers(userId: string) {
        try {
            var userLists: any = await User.find({ _id: { $ne: userId } }).lean().exec();
            userLists.map((a: any) => a.id = a._id.toString());
            return { data: userLists };
        }
        catch (err) {
            return err;
        }

    }

    async updateUser(user: any) {
        try {
            var exsitUser = await User.findOne({ _id: { $eq: user.id } });
            if (exsitUser) {
                exsitUser.userEmail = user.userEmail;
                exsitUser.password = user.password;

                var salt = bcrypt.genSaltSync(10);
                exsitUser.password = bcrypt.hashSync(user.password, salt);

                var newUser = await User.update(exsitUser);
                const token = jwt.sign({ _id: newUser._id }, config.jwtSecret);

                return { message: "User Updated Successfully", token };
            }
            else {
                return { message: "Invalid user" };
            }
        }
        catch (err) {
            return err;
        }
    }

    async deleteUser(id: string) {
        try {
            await User.deleteOne({ _id: { $eq: id } });
            return { message: "Deleted successfully" };
        }
        catch (err) {
            return err;
        }
    }
}