const path = require('path')
const { app, BrowserWindow, Menu, screen } = require('electron')

// メニューバーを無効化
// Menu.setApplicationMenu(false)

let mainWindow
function initWindow() {
  // メインウィンドウのオプション
  // https://www.electronjs.org/ja/docs/latest/api/browser-window#%E3%82%AF%E3%83%A9%E3%82%B9-browserwindow
  const options = {
    x: 20,
    y: 120,
    width: 1280,
    height: 720,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    autoHideMenuBar: true,
  }

  // マルチディスプレイ環境の場合はセカンドスクリーンに表示したい
  // https://www.electronjs.org/ja/docs/latest/api/screen
  const displays = screen.getAllDisplays()
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  })
  if (externalDisplay) {
    options.x += externalDisplay.bounds.x
    options.y += externalDisplay.bounds.y
  }

  // メインブラウザウィンドウを作成
  mainWindow = new BrowserWindow(options)

  // メニューバーの非表示関連
  // F11で全画面などの機能は生かしておきたいため autoHideMenuBar: true でメニューバーを隠すようにした
  // mainWindow.setMenu(null)
  // mainWindow.setMenuBarVisibility(false)
  // mainWindow.removeMenu()

  // ページ読み込み
  mainWindow.loadURL(`file://${__dirname}/docs/latest/index.html`)
  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // 開発者ツールの位置を制御したい
  // https://stackoverflow.com/questions/53678438/dev-tools-size-and-position-in-electron
  const devtools = new BrowserWindow({
    show: false,
    parent: mainWindow,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    },
  })
  mainWindow.webContents.setDevToolsWebContents(devtools.webContents)
  mainWindow.webContents.openDevTools({ mode: 'detach' })
  mainWindow.webContents.once('did-finish-load', () => {
    const windowBounds = mainWindow.getBounds()
    devtools.setPosition(windowBounds.x + windowBounds.width, windowBounds.y)
    devtools.setSize(600, windowBounds.height)
    devtools.show()
  })
}

app.on('ready', initWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    initWindow()
  }
})
