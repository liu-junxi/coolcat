const {
    Menu
} = require('electron')
let template = [{
    label: '帮助',
    click: () => {
        
        var { BrowserWindow } = require('electron')
        //获取当前窗口
        
        bWindow = new BrowserWindow({ width: 900, height: 600, webPreferences: { nodeIntegration: true } })
        bWindow.loadURL('http://www.liujunxi.vip/coolcat/bz.html');
        bWindow.on('closed', () => {
            bWindow = null;
        })
    
    }
}, {
    label: '查看',
    submenu: [{
        label: '大图标',
        click: () => {
            setType("big")
            global.aname = {
                yourmsg: '1'
            }


        }
    },
    {
        label: '中图标',
        click: () => {
            setType("middle")
            global.aname = {
                yourmsg: '2'
            }

        }
    },
    {
        label: '小图标',
        click: () => {
            setType("small")
            global.aname = {
                yourmsg: '3'
            }

        }
    },
    {
        label: '列表',
        click: () => {
            setType("列表")
            global.aname = {
                yourmsg: '4'
            }
        }
    },
    {
        label: '详细信息',
        click: () => {
            setType("详细列表")
            global.aname = {
                yourmsg: '5'
            }
        }
    }
    ]
}
]

let template2 = [{
    label: '帮助',
    click: () => {
        
        var { BrowserWindow } = require('electron')
        //获取当前窗口
        
        bWindow = new BrowserWindow({ width: 900, height: 600, webPreferences: { nodeIntegration: true } })
        bWindow.loadURL('http://www.liujunxi.vip/coolcat/bz.html');
        bWindow.on('closed', () => {
            bWindow = null;
        })
    
    }
}
]

let m = Menu.buildFromTemplate(template);
let m1 = Menu.buildFromTemplate(template2);
var fs = require("fs");
var path = require('path')
var buf = new Buffer.alloc(1024);

//防止重复执行
var n = true
var n1 = true

var exec = require('child_process').execSync
//useid是用户名
var whoami = exec('whoami').toString()
var useid = whoami.slice(whoami.indexOf('\\') + 1, whoami.length - 1)
var yhsj = "/home/" + useid + "/.config/coolcat"
// var yhsj="D:/"
var fs = require("fs");



setInterval(() => {
    fs.open(yhsj + "/information/swicth/1.txt", 'r+', function (err, fd) {
        if (err) { console.log(err) }
        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) { console.log(err) }
            if (bytes > 0) {
                if (buf.slice(0, bytes).toString() == 0 && n) {
                    Menu.setApplicationMenu(m);
                    n = false
                    n1 = true

                } else if (buf.slice(0, bytes).toString() == 1 && n1) {
                    Menu.setApplicationMenu(m1);
                    n1 = false
                    n = true

                }
            }
            fs.close(fd, function (err) {
                if (err) {
                    console.log(err);
                }
            });
        });
    });


}, 200)


function setType(data) {
    var path = require('path')
    var fs = require("fs");
    fs.writeFile(yhsj + "/information/swicth/type.txt", data, function (err) {
        if (err) {
            console.log(err)
        }
    });

}


fs.open(yhsj + "/information/swicth/1.txt", 'r+', function (err, fd) {
    if (err) { console.log(err) }
    fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
        if (err) { console.log(err) }
        if (bytes > 0) {
            var n = buf.slice(0, bytes).toString()
            global.aname = {
                yourmsg: n
            }
        }
        fs.close(fd, function (err) {
            if (err) {
                console.log(err);
            }
        });
    });
});