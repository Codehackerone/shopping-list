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
        app.quit();
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
    addWindow.on('closed',function(){
        addWindow=null;
    });
}

ipcMain.on('add-shopping-list-item',function(event,arg){
    console.log(arg);
    mainWindow.webContents.send('add-shopping-list-item',arg);
    addWindow.close();
});

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

// if(process.platform==='darwin'){
//     mainMenuTemplate.unshift({});
// }


if(process.env.NODE_ENV!=='production'){
    mainMenuTemplate.push({
        label:'Developer Tools',
        submenu:[
            {
                label:'Toggle Developer Tools',
                accelerator:process.platform==='darwin'?'Command+Alt+I':'Ctrl+Alt+I',
                click(item,focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            },
            {
                label:'Reload',
                accelerator:process.platform==='darwin'?'Command+R':'Ctrl+R',
            }
        ]
    });
}