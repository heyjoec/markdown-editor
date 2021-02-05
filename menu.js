const { app, Menu, shell } = require('electron');

const { ipcMain } = require('electron');
const { BrowserWindow } = require('electron');

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
                    window.webContents.send(
                        'editor-event', 
                        'toggle-bold'
                    )
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

  {
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
    }

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

      const menu = Menu.buildFromTemplate(template);

module.exports = menu;
