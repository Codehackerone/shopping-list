const electron=require('electron')
const url=require('url');
const path=require('path');

const {app, BrowserWindow, Menu, ipcMain, dialog}=electron;

let mainWindow;

