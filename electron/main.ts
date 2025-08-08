import { app, BrowserWindow, ipcMain ,Menu } from 'electron'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'   // ✅ 新增

function setAppMenu() {
  const template = [
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        // 这里绑定 F12 和 Ctrl+Shift+I 两种
        { role: 'toggleDevTools', accelerator: 'F12' },
        { role: 'toggleDevTools', accelerator: 'Ctrl+Shift+I' },
      ],
    },
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}
// ✅ 在 ESM 里自己算 __dirname / __filename
const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

let win: BrowserWindow | null = null



async function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      // ✅ 预加载用真实产物名：preload.mjs（如果你看到 dist-electron 里就是 .mjs）
      preload: path.join(__dirname, 'preload.mjs'),
      // 更稳妥的写法（不怕路径分隔符问题）：
      // preload: fileURLToPath(new URL('./preload.mjs', import.meta.url)),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  const devUrl = process.env.VITE_DEV_SERVER_URL
  if (devUrl) {
    await win.loadURL(devUrl)
    // win.webContents.openDevTools()
  } else {
    await win.loadFile(path.join(__dirname, '../dist/index.html'))
  }
}

app.whenReady().then(() => {
    setAppMenu()
    createWindow()
})
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit() })
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow() })

ipcMain.handle('ping', () => 'pong')
