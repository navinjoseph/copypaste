import { sendMessage } from './client';
import { listRoom, joinRoom, appendToRoomList, addRoom }  from './room';


document.onload = (function () {
  const socket = io();

  let userID = "";
  let JoinedRoom = "";

  socket.on("connect", async () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    userID = document.getElementById("userID").value = socket.id;
    const Data = await listRoom();
    appendToRoomList(Data);
  });

  socket.on("connected_to_room", async (...args) => {
    console.log("Connected to Room");
    const Data = await listRoom();
    appendToRoomList(Data);
  });

  socket.on("Sendmessage", (...args) => {
    const {message, senderUserId} = args[0];
    if(senderUserId === userID) {
      document.querySelector('#chat-window').innerHTML += (`
      <div class="msg-you"><p><i>You</i>: ${message}</p></div>
      `);
    } else {
      document.querySelector('#chat-window').innerHTML += (`
      <div class="msg-remote">
        <p><i>${senderUserId}:</i> ${message}</p>
      </div>
      `);
    }
  });


  document.querySelector('#addRoom').addEventListener('click', async () => {
    const roomName = document.getElementById('roomName').value;
    await addRoom(userID, roomName);
  }); 

  document.querySelector('#roomlist').addEventListener('click', async (e) => {
    e.preventDefault();

    await joinRoom(userID, e.target.dataset.roomname);
    JoinedRoom = e.target.dataset.roomname;
    document.querySelector('#chat-window').innerHTML = "Joined room " + JoinedRoom;
  });

  document.querySelector('#sendMsg').addEventListener('click', async (e) => {
    console.log("Send Message");
    const msg = document.querySelector(
      '#message'
    ).value;
    
    if(JoinedRoom === "") {
      console.error('No room joined');
      return 
    }

    await sendMessage(msg, JoinedRoom, userID);
    document.querySelector('#message').value = "";
  });



}());


