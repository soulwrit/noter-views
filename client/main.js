// Modules to control application life and create native browser window
const url = require('url')
const path = require('path')
const { app, BrowserWindow, ipcMain } = require('electron')
const utils = require('./resources/utils')

let master

function createWindow() {
  // 创建浏览器窗口。
  master = new BrowserWindow({
    width: 1024,
    height: 640,
    frame: false,
    titleBarStyle: 'customButtonsOnHover',
    useContentSize: true
  })

  // 显示
  master.show()

  // 取消原生的菜单
  master.setMenu(null)

  if (utils.isProd) {
    console.log(111)
    master.loadURL(
      url.format({
        pathname: path.join(__dirname, './index.html'),
        protocol: 'file:',
        slashes: true
      })
    )
  } else {
    // 然后加载应用 
    // master.loadURL('http://localhost:8333')
    master.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    )

    // 打开开发者工具
    master.webContents.openDevTools()
  }

  // 当 window 被关闭，这个事件会被触发。
  master.on('closed', () => {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 与此同时，你应该删除相应的元素。
    master = null
  })
}

// Electron 会在初始化后并准备
// 创建浏览器窗口时，调用这个函数。
// 部分 API 在 ready 事件触发后才能使用。
app.on('ready', createWindow)

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (master === null) {
    createWindow()
  }
})

ipcMain.on('min', e => master.minimize());
ipcMain.on('max', e => {
  if (master.isMaximized()) {
    master.unmaximize()
  } else {
    master.maximize()
  }
})

ipcMain.on('close', e => master.close(e))