'use strict'

import { app, BrowserWindow, ipcMain, Tray, Menu, screen } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

const path = require('path')
const iconPath = path.join(__static, 'icon.ico')

let mainWindow
let tray

// Scheme must be registered before the app is ready
// protocol.registerSchemesAsPrivileged([
//   { scheme: 'app', privileges: { secure: true, standard: true } }
// ])

app.on('ready', async () => {
  mainWindow = new BrowserWindow({
    frame: false,
    resizable: false,
    width: 700,
    height: 700,
    icon: iconPath,
    webPreferences: {
      backgroundThrottling: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL + '/main.html')
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    mainWindow.loadURL(`file://${__dirname}/main.html`)
  }
  mainWindow.removeMenu()
  setTray()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

ipcMain.on('mainWindow:close', () => {
  mainWindow.hide()
})

function setTray () {
  tray = new Tray(iconPath)
  tray.setToolTip('Tasky')
  tray.on('click', () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide()
    } else {
      mainWindow.show()
    }
  })
  tray.on('right-click', () => {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => app.quit()
      }
    ])
    tray.popUpContextMenu(menuConfig)
  })
}


