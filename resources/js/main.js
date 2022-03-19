// This is just a sample app. You can structure your Neutralinojs app code as you wish.
// This example app is written with vanilla JavaScript and HTML.
// Feel free to use any frontend framework you like :)
// See more details: https://neutralino.js.org/docs/how-to/use-a-frontend-library

const extensionId = "js.neutralino.sample.my_nodejs_extension";

function showInfo(msg) {
    document.getElementById("info").value = msg;
}

function showInput(msg) {
    document.getElementById("input").value = msg;
}
function focusInput() {
    document.getElementById("input").focus();
}

function showOutput(msg) {
    document.getElementById("output").value = msg;
}

function getInput() {
    let value = document.getElementById("input").value || "Sample Input " + Math.random().toString(36).substring(2);
    if(value.includes("Sample Input"))
        value = "Sample Input" + Math.random().toString(36).substring(2);
    document.getElementById("input").value = value;
    return value;
}

async function callNodeJSExtension() {
    showInfo("Calling extension with input: " + getInput());

    try {
        await Neutralino.extensions.dispatch(extensionId, "fromAppToExtension", getInput())
    } catch {
        showInfo("Error: Extension isn't loaded!");
    }
    showInput("");
    focusInput();
}

function openDocs() {
    Neutralino.os.open("https://neutralino.js.org/docs");
}

function openTutorial() {
    Neutralino.os.open("https://www.youtube.com/watch?v=txDlNNsgSh8&list=PLvTbqpiPhQRb2xNQlwMs0uVV0IN8N-pKj");
}

function onWindowClose() {
    Neutralino.app.exit();
}

function onNodeJSExtensionResponse(evt) {
    showOutput(evt.detail);
}

Neutralino.init();

Neutralino.events.on("windowClose", onWindowClose);
Neutralino.events.on("fromExtensionToApp", onNodeJSExtensionResponse);

// these two functions below are not needed
Neutralino.events.on("extensionReady", (evt) => {
    showInfo("Extension ready: " + evt.detail);
});
Neutralino.events.on("extClientConnect", (evt) => {
    showInfo("Extension connected: " + evt.detail);
});