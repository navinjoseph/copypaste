const RoomPrefix = "-rooms-";


async function addRoom(userID, roomName) {
    
    if(roomName === "") {
      return;
    }

    await joinRoom(userID, `${RoomPrefix}${roomName}`);
  }

  async function joinRoom(userID, roomName) {
    if(roomName === "") {
      return;
    }

    const list = await fetch(`http://localhost:3000/joinRoom/${userID}/${roomName}`);
    const data = await list.json();
    console.log(data);
  }

  async function listRoom() {
    const list = await fetch('http://localhost:3000/listRooms');
    const data = await list.json();
    
    console.log(data);
    return data
  }

  function appendToRoomList(Data) {
    document.getElementById('roomlist').innerHTML = Data.roomsList.map(room => {
      return `<li>${room} <a href="#" id="joinRoom${room}" data-roomname="${room}">Join</a></li>`
    }).join('');
   
  }

  export { addRoom, listRoom, joinRoom, appendToRoomList };