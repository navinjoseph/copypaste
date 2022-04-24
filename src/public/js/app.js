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
      <div class="msg-you"><p><i>You</i>: ${convertSpecialTag(message)}</p></div>
      `);
    } else {
      document.querySelector('#chat-window').innerHTML += (`
      <div class="msg-remote">
        <p><i>${senderUserId}:</i> ${ convertSpecialTag(message) }</p>
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

  function convertSpecialTag(message) {
    return linkify(message);
  }

  function linkify(inputText) {
    var replacedText, replacePattern1, replacePattern2, replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    console.log(replacedText);


    return replacedText;
}



}());


