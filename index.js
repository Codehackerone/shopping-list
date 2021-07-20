const electron=require('electron')
const url=require('url');
const path=require('path');

const {app, BrowserWindow, Menu, ipcMain, dialog}=electron;

let mainWindow;

app.on('ready',function(){
    mainWindow=new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'mainWindow.html'),
        protocol:'file:',
        slashes:true
    }));
    mainWindow.on('closed',function(){
        mainWindow=null;
    });
});