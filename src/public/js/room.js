const RoomPrefix = "-rooms-";
const HOST = process.env.APP_HOST;
async function addRoom(userID, roomName) {
  if (roomName === "") {
    return;
  }

  await joinRoom(userID, `${RoomPrefix}${roomName}`);
}

async function joinRoom(userID, roomName) {
  if (roomName === "") {
    return;
  }

  const list = await fetch(
    `${HOST}/joinRoom/${userID}/${roomName}`
  );
  const data = await list.json();
  console.log(data);
}

async function listRoom() {
  const list = await fetch(`${HOST}/listRooms`);
  const data = await list.json();

  console.log(data);
  return data;
}

function appendToRoomList(Data) {
  document.getElementById("roomlist").innerHTML = Data.roomsList
    .map((room) => {
      return `
      <li class="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
      <div class="w-0 flex-1 flex items-center">
                <span class="ml-2 flex-1 w-0 truncate">${room}</span>
                </div>
                  <div class="ml-4 flex-shrink-0">
                    <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"  id="joinRoom${room}" data-roomname="${room}"> Join </a>
                  </div>
                </li>
                `;
    })
    .join("");
}

export { addRoom, listRoom, joinRoom, appendToRoomList };
