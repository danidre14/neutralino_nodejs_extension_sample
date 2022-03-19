const fs = require("fs");
const websocket = require("websocket").w3cwebsocket;
const { v4: uuidv4 } = require("uuid");


// get authentication info from the file that is regenerated each time the app is launched
let authInfo = fs.readFileSync(".tmp/auth_info.json");
authInfo = JSON.parse(authInfo);

const NL_PORT = authInfo.port;
const NL_TOKEN = authInfo.accessToken;
const NL_EXTID = "js.neutralino.sample.my_nodejs_extension";
const WS_URL = `ws://localhost:${NL_PORT}?extensionId=${NL_EXTID}`


function onerror (e) {
    console.log("There is a connection error!");
};

function onopen () {
    console.log("Connected to application!")
};

function onclose () {
    log("Connection has been closed");
    // Make sure to exit the extension process when WS extension is closed (when Neutralino app exits)
    process.exit();
};

function onmessage (e) {
    // the typical message sent from the neu application is a string in the form {"data": value, "event": "dispatchedEventName"} so we parse the data here
    if (typeof e.data === "string") {
        const message = JSON.parse(e.data);

        // Use extensions.dispatch or extensions.broadcast from the app,
        // to send an event here
        const eventName = message.event;
        switch (eventName) {
            // this event is received when the neutralino app's window is closed. Thiis code closes the extension websocket connection.
            case "windowClose":
                ws.close(0);
                break;
            case "fromAppToExtension":
                const data = message.data;
                console.log("Message received is: ", data);

                // Use Neutralinojs server's messaging protocol to trigger native API functions
                // Use app.broadcast method to send an event to all app instances

                ws.send(JSON.stringify({
                    id: uuidv4(),
                    method: "app.broadcast",
                    accessToken: NL_TOKEN,
                    data: {
                        event: "fromExtensionToApp",
                        data: `Hey neu app. NodeJS here. You sent me: ${data}`
                    }
                }));
                break;
        }
    }
};


const ws = new websocket(WS_URL);
ws.onopen = onopen;
ws.onmessage = onmessage;
ws.onerror = onerror;
ws.onclose = onclose;