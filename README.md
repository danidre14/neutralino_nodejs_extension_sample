# neutralinojs-nodejs-extension-sample
A simple neu application that connects to a nodejs extension file. Started off with the default neu template in cli version `9.2.0`, binary version `4.4.0`, client version `3.3.0`.

## Setup
- Include `"extensions.*"` in the `"nativeAllowList"` inside your `neutralino.config.json` file. <br /> This is so you can call `Neutralino.extension` methods in your client-code.
- Set the option `"enableExtensions": true` inside your `neutralino.config.json` file. <br /> This is so your app tries to use websocket extensions when launched.
- Set the option `"exportAuthInfo": true` inside your `neutralino.config.json` file. <br /> This is what we read from in the extension file to get the necessary information for the websocket connection.

## Alter
- Create a javascript file in the extensions folder in a folder name of your choice. The extensions folder is in the same directory as your `neutralino.config.json` file. <br /> Check the `extensions/my_nodejs_extension/main.js` for our nodejs extension code.
- Check the existing `resources/index.html` file for modifications to communicate with the extension.
- Check the existing `resources/js/main.js` file for modifications to communicate with the extension.

## Experimental (but works)
- Check the `neutralino.config.json` file for the `"extensions"` array which shows the format of how to call the extension. You'd realize I used a relative path, because I was never successful using the absolute path and including `${NL_PATH}` like specified in the docs. <br /> Also notice that the `"id"` of our extension in this file matches the `NL_EXTID` we use in the nodejs extension file when connecting to the websocket, as well as the `extensionId` in the javascript client file when dispatching (communicating with the extension folder).

## Disclaimers
- You may need to do error handling in your nodejs extension so that it does not crash.
- This nodejs extension uses `websocket` and `uuid` to work. Ensure that you first `npm i` in the `package.json` directory to import the necessary `node_modules` before testing your app.
- Not every computer may have nodejs installed, so you should bundle the nodejs application as an `.exe` when distributing. Don't forget to adjust your `"command"` in your `neutralino.config.json` file to launch that `.exe` instead. <br />I have no idea how to bundle nodejs applications but someone suggested "bundling/packaging it with [caxa](https://github.com/leafac/caxa)" and "minifying/compressing with tools like [upx](https://github.com/upx/upx)". I have not explored much into it so I can't confirm it.
- I removed unnecessary things from the `neutralino.config.json` file for this sample. Your configuration file may differ based on what you need for your own application.

# Icon credits

- `trayIcon.png` - Made by [Freepik](https://www.freepik.com) and downloaded from [Flaticon](https://www.flaticon.com)
