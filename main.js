const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;
let splashWindow;

function createWindows() {
    // 1. Создаем Интро-окно
    splashWindow = new BrowserWindow({
        width: 450,
        height: 450,
        frame: false,          // Без рамок Windows
        alwaysOnTop: true,     // Поверх всех окон
        resizable: false,
        show: false,           // СНАЧАЛА ПРЯЧЕМ, чтобы не было пустого экрана
        backgroundColor: '#0b0b0e', // Родной цвет приложения сразу при создании
        icon: path.join(__dirname, 'icon.ico')
    });

    splashWindow.loadFile('splash.html');

    // Показываем интро ТОЛЬКО когда оно полностью отрендерилось
    splashWindow.once('ready-to-show', () => {
        splashWindow.show();
    });

    // 2. Создаем Главное окно плеера (в фоне)
    mainWindow = new BrowserWindow({
        width: 1050,
        height: 750,
        minWidth: 800,
        minHeight: 600,
        title: "SpotiFAKE DEV",
        backgroundColor: '#0b0b0e',
        show: false, 
        icon: path.join(__dirname, 'icon.ico'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.setMenuBarVisibility(false);
    mainWindow.loadFile('index.html');

    // Через 3.5 секунды закрываем интро и показываем плеер
    setTimeout(() => {
        if (splashWindow && !splashWindow.isDestroyed()) {
            splashWindow.close();
        }
        mainWindow.show();
    }, 3500); 
}

app.whenReady().then(createWindows);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});