
import Pusher from "pusher";
import ClientPusher from "pusher-js"


export const serverPusher = new Pusher({
    appId: `${process.env.PUSHER_APP_ID}` as string,
    key: `${process.env.PUSHER_APP_KEY}` as string,
    secret: `${process.env.PUSHER_APP_SECRET}` as string,
    cluster: "ap2",
    useTLS: true
})



export const clientPusher = new ClientPusher('1563818a62ccf6f13548', {
    cluster: 'ap2',
    forceTLS: true
  });

