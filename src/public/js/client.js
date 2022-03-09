async function sendMessage(message, roomId, senderUserId) {
    const send = await fetch(`${process.env.APP_HOST}/sendMsgtoRoom`, {
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