import { Post, Body, JsonController, Authorized, Param, Get } from "routing-controllers";
import { UserService } from "../service/UserService";

@Authorized()
@JsonController("/api/user")
export class UserController {

    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }

    @Get('/getUsers/:userId')
    public async getUsers(@Param("userId") userId: string) {
        try {
            return await this.userService.getUsers(userId);
        }
        catch (err) {
            return err;
        }
    }

    @Post('/update')
    public async update(@Body() user: any) {
        try {
            return await this.userService.updateUser(user);
        }
        catch (err) {
            return err;
        }
    }

    @Get('/delete/:id')
    public async delete(@Param("id") id: string) {
        try {
            return await this.userService.deleteUser(id);
        }
        catch (err) {
            return err;
        }
    }
}