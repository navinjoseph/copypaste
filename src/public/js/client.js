async function sendMessage(message, roomId, senderUserId) {
    const send = await fetch(`http://localhost:3000/sendMsgtoRoom`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message,
            roomId,
            senderUserId
        })
    });


    const resp = await send.json();
    console.log(resp);
}


export { sendMessage } 