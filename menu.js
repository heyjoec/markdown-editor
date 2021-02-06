const {
  app,
  Menu,
  shell,
  ipcMain,
  BrowserWindow,
  globalShortcut,
  dialog
} = require('electron');



app.on('ready', () => {
  globalShortcut.register('CommandOrControl+S', () => {
    console.log('Saving the file');
ipcMain.on('save', (event, arg) => {
  console.log(`Saving content of the file`);
  console.log(arg);
});

const window = BrowserWindow.getFocusedWindow();
  window.webContents.send('editor-event', 'save');
  });
});

ipcMain.on('editor-reply', (event, arg) => {
  console.log(`Received reply from web page: ${arg}`);
});

const template = [
    {
        role: 'help',
        submenu: [
            {
                label: 'About Editor Component',
                click() {
                    shell.openExternal('https://simplemde.com/');
                }
            }
        ]
    },
    {
        label: 'Format',
        submenu: [
            {
                label: 'Toggle Bold',
                click() {
                    const window = BrowserWindow.getFocusedWindow();
                    window.webContents.send('editor-event', 'toggle-bold');
                }
            },
            {
                label: 'Toggle Italic',
                click() {
                    const window = BrowserWindow.getFocusedWindow();
                    window.webContents.send(
                    'editor-event', 
                    'toggle-italic'
                    )
                }
            },
            {
                label: 'Toggle Strikethrough',
                click() {
                    const window = BrowserWindow.getFocusedWindow();
                    window.webContents.send(
                    'editor-event', 
                    'toggle-strikethrough'
                    )
                }
            }
        ]
    }
];

    if (process.env.DEBUG) {
        template.push({
          label: 'Debugging',
          submenu: [
            {
              label: 'Dev Tools',
              role: 'toggleDevTools'
            },
      
            { type: 'separator' },
            {
              role: 'reload',
              accelerator: 'Alt+R'
            }
          ]
        });
      }

        if (process.platform === 'win32') {
        template.unshift({
          label: app.getName(),
          submenu: [
            { role: 'about' },
            { type: 'separator' },
            { role: 'quit' }
          ]
        })
      }

      const menu = Menu.buildFromTemplate(template);

module.exports = menu;
