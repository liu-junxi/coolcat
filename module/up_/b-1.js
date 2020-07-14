document.body.onselectstart = document.body.oncontextmenu = function () { return false; }
var path=require('path')
var fs = require("fs");

const prompt = require('electron-prompt');

const main0 = document.getElementById("main0");

//等待时间
const time = 400;
//刷新等待 
const time1 = 600

// path_1是保存路径的数组
var path_1 = []
path_1[0] = "/home/" + useid + "/"

// path_2是保存当前路径子目录的数组
var path_2 = []

// path_copy是保存粘贴功能的路径
var path_copy = null
// p_name是粘贴时的文件名字
var p_name = null
//p_t为true表示正处于剪切模式
var p_t = false

var bay, bay1

var up_1, up_2
if (localStorage.up_type == 0) {
    up_1 = 0
    up_2 = 1
} else if (localStorage.up_type == 1) {
    up_1 = 1
    up_2 = 0
}


document.getElementById("yes").onclick = function () {
    // console.log(bay+"---"+localStorage.up_type)
    localStorage.bdy_path = bay + bay1
    localStorage.bdy_name = bay1
    switch (localStorage.up_type1) {
        case "bdy":
            localStorage.bdy_ = "true"
            window.location.href = "./bdy.html"
            break
        case "ftp":
            localStorage.ftp_ = "true"
            window.location.href = "./ftp.html"
            break
        case "smb":
            localStorage.smb_ = "true"
            window.location.href = "./smb.html"
            break
        case "webdav":
            localStorage.webdav_ = "true"
            window.location.href = "./webdav.html"
            break
        case "qiniu":
            localStorage.qiniu_ = "true"
            window.location.href = "./qiniu.html"
            break
        case "bf_1":
            localStorage.bf_1 = "true"
            window.location.href = "./time.html"
            break
        case "bf_2":
            localStorage.bf_2 = "true"
            window.location.href = "./time.html"
            break
        case "c_xn":
            localStorage.c_xn = "true"
            // console.log(localStorage.bdy)
            window.location.href = "./time.html"
            break

    }

}
document.getElementById("no").onclick = function () {
    console.log("no")
    // window.location.href = "./bdy.html"
    switch (localStorage.up_type1) {
        case "bdy":
            
            window.location.href = "./bdy.html"
            break
        case "ftp":
            
            window.location.href = "./ftp.html"
            break
        case "smb":
           
            window.location.href = "./smb.html"
            break
        case "webdav":
           
            window.location.href = "./webdav.html"
            break
        case "qiniu":
           
            window.location.href = "./qiniu.html"
            break
        case "bf_1":
            
            window.location.href = "./time.html"
            break
        case "bf_2":
            
            window.location.href = "./time.html"
            break
        case "c_xn":
            
            window.location.href = "./time.html"
            break

    }
}


//获取子目录，及判断子目录的类型（文件/文件夹）
path_2 = Judge_Path(path_1[path_1.length - 1])
setTimeout(x, time);




//更新变化区域的页面内容
function x() {
    create_j(path_2,[],[],(res)=>{
        main0.innerHTML = res
        create_s(path_2, (a, list, i) => {
            a.ondblclick = function () {
                if (list[list.length / 2 + i] == 1) {
                    path_2 = Judge_Path(path_1[path_1.length - 1] + list[i] + "/")
                    path_1[path_1.length] = path_1[path_1.length - 1] + list[i] + "/"
                    setTimeout(x, time);
                    a.ondblclick = null;
                }
            }
    
            a.onclick = function () {
    
                if (list[list.length / 2 + i] == up_1) {
                    var siblings = this.parentNode.querySelectorAll('div');
                    for (let i = 0; i < siblings.length; i++) {
                        siblings[i].style.backgroundColor = 'transparent';
                        siblings[i].style.border = '0';
                    }
                    this.style.border = '0.5px solid #33D4FF';
                    this.style.backgroundColor = '#DAF5FF';
                    bay = path_1[path_1.length - 1]
                    bay1 = path_2[i]
                } else if (list[list.length / 2 + i] == up_2) {
                    path_2 = Judge_Path(path_1[path_1.length - 1] + list[i] + "/")
                    path_1[path_1.length] = path_1[path_1.length - 1] + list[i] + "/"
                    setTimeout(x, time);
                    a.ondblclick = null;
                }
             
            }
        })//绑定单击与双击事件
    })

    
}

//前往指定页面,(路径以"/"结束)
function x1(path) {
    path_2 = Judge_Path(path)
    path_1[path_1.length] = path
    setTimeout(x, time);
}

//刷新当前页面
function x2() {
    setTimeout(function () {
        path_2 = Judge_Path(path_1[path_1.length - 1])
    }, time1)
    setTimeout(x, time + time1);
}


// 返回路径a下的子路径，和类型
function Judge_Path(pa) {
    var files_z = fs.readdirSync(pa)
    var m = files_z.length
    for (let n = 0; n < m; n++) {
        (function (n) {
            fs.stat(pa + files_z[n], function (err, stats) {
                if (stats.isFile()) {
                    files_z[m + n] = '0'
                } else {
                    files_z[m + n] = '1'
                }
            })
        })(n)

    }
    // console.log(files_z);

    return files_z

}


