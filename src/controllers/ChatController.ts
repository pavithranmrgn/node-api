import { Post, Body, JsonController, Authorized, Param, Get } from "routing-controllers";
import { ChatService } from "../service/ChatService";

@Authorized()
@JsonController("/api/chat")
export class UserController {

    private chatService: ChatService;
    constructor() {
        this.chatService = new ChatService();
    }

    @Post('/Create')
    public async createMessage(@Body() chat: any) {
        try {
            return await this.chatService.createMessage(chat);
        }
        catch (err) {
            return err;
        }
    }

    @Get('/GetMessage/:senderId&&:recieverId')
    public async getMessage(@Param("senderId") senderId: string, @Param("recieverId") recieverId: string) {
        try {
            return await this.chatService.getMessage(senderId, recieverId);
        }
        catch (err) {
            return err;
        }
    }
}