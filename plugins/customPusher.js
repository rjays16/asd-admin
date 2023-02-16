window.Pusher = require("pusher-js");
window.pusher = new Pusher(process.env.PUSHER_APP_KEY, {
    cluster: process.env.PUSHER_APP_CLUSTER,
});

Pusher.logToConsole = true;