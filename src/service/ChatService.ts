import Chat from '../models/Chat';

export class ChatService {

    async createMessage(chat: any) {
        try {
            var chatCreateObj = new Chat({
                message: chat.message,
                recieverId: chat.recieverId,
                senderId: chat.senderId,
                isDeleteRecieverOnly: false,
                isDeleteSenderOnly: false,
                createdDate: new Date()
            });
            var newChat = await Chat.create(chatCreateObj);

            return { data: newChat };
        }
        catch (err) {
            return err;
        }
    }

    async getMessage(senderId: string, recieverId: string) {
        try {
            var chats = await Chat.find({
                senderId: { $in: [senderId, recieverId] }, recieverId: { $in: [senderId, recieverId] }
            },
                null,
                {
                    sort: {
                        createdDate: 1
                    }
                }).lean().exec();
            return { data: chats };
        }
        catch (err) {
            console.log(err);
        }
    }
}