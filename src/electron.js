const { app, BrowserWindow } = require('electron')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    console.log('BrowserWindow created')

    win.loadURL('http://localhost:5173/')
    console.log('URL loaded')
}

app.whenReady().then(() => {
    console.log('App is ready')
    createWindow()

    app.on('activate', function () {
        console.log('App activated')
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', function () {
    console.log('All windows closed')
    if (process.platform !== 'darwin') app.quit()
})