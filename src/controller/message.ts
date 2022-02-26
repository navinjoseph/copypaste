import { Server } from "socket.io";

class Message {
    private io: Server;
    constructor(io: Server) {
      this.io = io;
    }

    public sendMessage(senderUserId: string, message: string, room: string) {
        this.io.to(room).emit('Sendmessage', { message, senderUserId });
    }
}

export default Message;