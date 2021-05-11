var bcrypt = require('bcryptjs');
import jwt from 'jsonwebtoken';

import { config } from '../config/config';
import User from '../models/User';

export class AuthService {

    async registerUser(user: any) {
        try {
            var salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(user.password, salt);

            var userCreateObj = new User({
                userEmail: user.userEmail,
                password: user.password
            });
            await User.create(userCreateObj);

            return { message: "User Registered Successfully" };
        }
        catch (err) {
            return err;
        }
    }

    async login(userEmail: string, password: string) {
        try {
            var exsitUser = await User.findOne({ userEmail: { $eq: userEmail } });
            if (exsitUser) {
                var isMatch = bcrypt.compareSync(password, exsitUser.password);
                if (!isMatch) {
                    return { message: "Invalid Password" };
                }
                const token = jwt.sign({ id: exsitUser.id, name: exsitUser.userEmail }, config.jwtSecret);
                var usertoJson = exsitUser.toJSON()
                Object.assign(usertoJson, { token, id: exsitUser.id });
                return { data: usertoJson, message: "Login Success" };
            }
            else {
                return { data: exsitUser, message: "User does not exist" };
            }
        }
        catch (err) {
            return err;
        }
    }
}