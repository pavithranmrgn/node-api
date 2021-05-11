
import { Application } from 'express';
import { verify } from 'jsonwebtoken';
import { createExpressServer, Action } from 'routing-controllers';
import mongoose from 'mongoose';
import { config } from './config/config';
import 'reflect-metadata';
import { ChatService } from './service/ChatService';

async function authorizationChecker(
    action: Action
): Promise<boolean> {
    return new Promise<boolean>(resolve => {
        const token = (action.request.headers['authorization'] || '').replace(
            'Bearer ',
            ''
        );

        if (!token) {
            throw new Error('Invalid token');
        }

        verify(token, config.jwtSecret, (err: any, decoeded: any) => {
            if (err) {
                throw new Error('Token expired or invalid.');
            }
            action.request.token = decoeded;
            resolve(true);
        });
    });
}

async function createServer(): Promise<any> {
    try {
        const app: Application = createExpressServer({
            authorizationChecker: authorizationChecker,
            cors: true,
            defaultErrorHandler: true,
            controllers: [__dirname + '/controllers/**/*.js']
        });

        app.get('/', (req, res) => {
            res.send("Api is listening");
        });

        const port = process.env.PORT || 4200;

        mongoose.connect(
            "mongodb://localhost:27017/ChatDB",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        mongoose.connection.once('open', function () {
            console.log('Database connected Successfully');
        }).on('error', function (err) {
            console.log('Error', err);
        });

        const http = require('http').Server(app);
        const io = require('socket.io')(http);

        // This creates our socket using the instance of the server
        var allClients: any = [];
        io.on('connection', function (socket: any) {
            allClients.push(socket);
            console.log('client connected');
            socket.on('onStartListening', (recieverId: string, senderId: string) => {
                var chatService = new ChatService();
                setInterval(async () => {
                    var res = await chatService.getMessage(senderId, recieverId);
                    socket.emit('onRecieveMessage', res);
                }, 3000);
            });

            socket.on('disconnect', function () {
                console.log('Got disconnect!');

                var i = allClients.indexOf(socket);
                allClients.splice(i, 1);
            });
        });

        http.listen(port, () => {
            console.log(`Api listening on PORT ${port}`);
        });

    } catch (error) {
        console.log(error);
    }
}

createServer();