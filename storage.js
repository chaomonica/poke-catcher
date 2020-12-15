const electron = require('electron');
const path = require('path');
const fs = require('fs');

/*
https://medium.com/cameron-nokes/how-to-store-user-data-in-electron-3ba6bf66bc1e
Typically data is stored in the user's 'app data' folder (varies by operating system)
  MacOS:~/Library/Application Support/<Your App Name>
  Windows:C:\Users\<you>\AppData\Local\<Your App Name>
  Linux:~/.config/<Your App Name>
    monica@ubuntu:/home/monica/.config/PokeCatcher/user-preferences.json
*/

class Storage {
  constructor(opts) {
    // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    // We'll use the `configName` property to set the file name and path.join to bring it all together as a string
    this.path = path.join(userDataPath, opts.configName + '.json');

    this.data = parseDataFile(this.path, opts.defaults);
  }

  // return the property on the `data` object
  get(key) {
    return this.data[key];
  }

  // ...and this will set it
  set(key, val) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

function parseDataFile(filePath, defaults) {
  // try/catch it in case the file doesn't exist yet, which will be the case on the first application run.
  // `fs.readFileSync` will return a JSON string which is parsed into a Javascript object
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch(error) {
    // if there was some kind of error, return the passed in defaults instead.
    return defaults;
  }
}

module.exports = Storage;