const { app, BrowserWindow } = require('electron');
const request = require('request-promise');
const cheerio = require('cheerio');
const prepareRenderer = require('electron-next');
const { ipcMain } = require('electron');

let mainWindow;

const options = {
  uri: 'https://mods.factorio.com/mod/Bottleneck/downloads',
  transform: function(body) {
    return cheerio.load(body);
  }
};
const selector =
  '#app_root > div > div.page-wrap > div.container > div.content > div > div.mod-card > div.mod-card-footer > div > div > a';

function createWindow() {
  // TODO: Сюда пихнуть авторизационную куку
  /*  request(options)
    .then($ => $(selector).attr('href'))
    .then(val => {
      console.log(val);
      // return request(val);
    })
    .then(val => {
      console.log(val);
    })
    .catch(err => console.log(err)); */
}

const loadAuthpage = win => {
  win.loadURL('https://mods.factorio.com/login');
  const { webContents } = win;
  webContents.on('dom-ready', () => {
    webContents.insertCSS(
      'html { overflow-y: hidden !important; } body { display: flex; align-items: center; height: 100vh !important; }'
    );
  });
};

app.on('ready', async () => {
  try {
    await prepareRenderer('./renderer');
  } catch (e) {
    console.log(e);
    // Next has failed to start but context menu should still work
    // TODO: Add error page
  }

  mainWindow = new BrowserWindow({
    width: 800,
    height: 650,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadURL('http://localhost:8000/auth');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  ipcMain.on('general', (event, message) => {
    if (message === 'auth') {
      loadAuthpage(mainWindow);
    }
  });
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});
