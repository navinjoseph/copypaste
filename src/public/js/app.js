import { listRoom, joinRoom, appendToRoomList, addRoom }  from './room';


document.onload = (function () {
  const socket = io();

  let userID = "";

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

  socket.on("message", (...args) => {
    console.log(args);
  });


  document.querySelector('#addRoom').addEventListener('click', async () => {
    const roomName = document.getElementById('roomName').value;
    await addRoom(userID, roomName);
  }); 

  document.querySelector('#roomlist').addEventListener('click', async (e) => {
    e.preventDefault();

    await joinRoom(userID, e.target.dataset.roomname);
  });



}());


