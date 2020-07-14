var electron = require('electron');
var app = electron.app;

var BrowserWindow = electron.BrowserWindow;
var mainWindow = null;

// require('./module/main/backup_.js')

const path = require('path')
app.on('ready', () => {
    mainWindow = new BrowserWindow({ width: 950, height: 600, webPreferences: { nodeIntegration: true } })
    // mainWindow.loadFile('./module/main/1.html')
    mainWindow.loadFile('./html/index.html')

    // mainWindow.loadFile('./bat/2.html')
    mainWindow.on('closed', () => {
        mainWindow = null
    })
})


var exec = require('child_process').execSync
//useid是用户名
var whoami = exec('whoami').toString()
var useid = whoami.slice(whoami.indexOf('\\') + 1, whoami.length - 1)
var yhsj = "/home/" + useid + "/.config/coolcat"
// var yhsj = "D:/"
var fs = require("fs"); 0

var yh_name = ['swicth/1.txt', 'swicth/type.txt', 'bdy.txt', 'information.txt'
    , 'manaulTiming.txt', 'qiniu.txt', 'smb.txt', 'webdav.txt']
var yh_fd = ['0', 'small', '0 cookie refresh_token', '0 account password port ip'
    , 'path path path Timing time time', '0 accessKey secretKey bucket confi'
    , '0 host', '0 account password d']
// 判断文件是否存在
function set_wb(path, txt) {
    fs.exists(path, function (e) {
        if (!e) {
            fs.writeFile(path, txt, function (err) {
                if (err) {
                    return console.error(err);
                }
            })
        }

    });
}
// set_wb("input.txt","0 cookie refresh_token")
fs.exists(yhsj, function (e) {
    if (!e) {
        fs.mkdir(yhsj , function (err) {
            fs.mkdir(yhsj + "/information", function (err) {
                fs.mkdir(yhsj + "/information/swicth", function (err) {

                    yh_name.forEach((e, index) => {
                        set_wb(yhsj + "/information/" + e, yh_fd[index])
                    })
                    setTimeout(() => {
                        require('./module/main/menu.js');
                    }
                        , 1000)

                });
            });
        })
    } else {
        require('./module/main/menu.js');
    }
})








