import { Server } from "socket.io";
const RoomPrefix = "-rooms-";
class Room {
  //private roomid: string;
  private io: Server;
  constructor(io: Server) {
    this.io = io;
  }

  createRoom() {}

  joinRoom() {}

  listRooms() {
    const rooms = this.io.sockets.adapter.rooms;
    const roomList: Array<string> = [];
    
    rooms.forEach((value, key) => {
      const testifRoom = RegExp(RoomPrefix, "g");
     
      if (testifRoom.test(key)) {
        roomList.push(key);
      }

    });

    return roomList;
  }
}

export default Room;
