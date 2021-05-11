import { Post, Body, Param, Get, JsonController } from "routing-controllers";

import { AuthService } from "../service/AuthService";

@JsonController("/api/auth")
export class AuthController {

    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    @Post("/Register")
    public async RegisterUser(@Body() user: any) {
        try {
            var s =  await this.authService.registerUser(user);
            return s;
        }
        catch (err) {
            return err;
        }
    }

    @Get('/Login/:userEmail&&:password')
    public async Login(@Param("userEmail") userEmail: string, @Param("password") password: string) {
        try {
            return await this.authService.login(userEmail, password);
        }
        catch (err) {
            return err;
        }
    }
}