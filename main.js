const { app, BrowserWindow, Tray } = require('electron');
const path = require('path');
const Storage = require('./storage.js');
/*
main process: https://www.electronjs.org/docs/glossary#main-process
The main process (commonly a file named main.js) is the entry point to every Electron app
  > controls the life of the app (from open to close)
  > manages native elements such as the Menu, Menu Bar, Dock, Tray, etc.
  > responsible for creating new renderer process in the app

app: controls application's event lifecycle
*/

//declare mainWindow here so that the window object doesn't get garbage collected
let mainWindow;

// instantiate storage class
const storage = new Storage({
  // data file is named 'user-preferences'
  // can be found: monica@ubuntu:/home/monica/.config/PokeCatcher/user-preferences.json
  configName: 'user-preferences',
  defaults: {
    // 800x600 is the default size the window
    windowBounds: { width: 800, height: 600 },
    pokemon: {bulbasaur: "hi"},


  }
});

app.on('ready', function() {
  // grabs height and width of window from storage
  let { width, height } = storage.get('windowBounds');

  //testing:
  storage.pokemon = {bulbasaur: "bulba"}
  //const incon = new Tray ('./dist/icon.png')

  // pass those values in to the BrowserWindow options
  mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
    nodeIntegration: true
}});

  // The BrowserWindow class extends the node.js core EventEmitter class, so we use that API
  // to listen to events on the BrowserWindow. The resize event is emitted when the window size changes.
  mainWindow.on('resize', () => {
    // The event doesn't pass us the window size, so we call the `getBounds` method which returns an object with the height, width, and x and y coordinates.
    let { width, height } = mainWindow.getBounds();
    // Now that we have them, save them using the `set` method.
    storage.set('windowBounds', { width, height });
  });

  mainWindow.loadURL('http://localhost:3455/');
  //mainWindow.loadURL('https://poke-catcher-m.herokuapp.com/');
});

/*

const { app, BrowserWindow } = require('electron')

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

*/

module.export = {storage: storage}