const electron=require('electron')
const url=require('url');
const path=require('path');

const {app, BrowserWindow, Menu, ipcMain, dialog}=electron;

let mainWindow;
let addWindow;

app.on('ready',function(){
    mainWindow=new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'mainWindow.html'),
        protocol:'file:',
        slashes:true
    }));
    const mainMenu=Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
    mainWindow.on('closed',function(){
        mainWindow=null;
    });
});

function createAddWindow() {
    addWindow=new BrowserWindow({
        width:300,
        height:200,
        title:'Add Shopping List Item'
    });
    addWindow.loadURL(url.format({
        pathname:path.join(__dirname,'addWindow.html'),
        protocol:'file:',
        slashes:true
    }));
}

const mainMenuTemplate=[
    {
        label:'File',
        submenu:[
            {
                label:'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label:'Remove Item',
            },
            {
                label:'Quit',
                accelerator:process.platform==='darwin'?'Command+Q':'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];