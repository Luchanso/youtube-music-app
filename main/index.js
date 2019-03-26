const { app, BrowserWindow } = require('electron');
const request = require('request-promise');
const cheerio = require('cheerio');
const prepareRenderer = require('electron-next');
const { ipcMain } = require('electron');

let mainWindow;

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
  mainWindow.setMenu(null);
  mainWindow.loadURL('https://music.youtube.com/');

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

