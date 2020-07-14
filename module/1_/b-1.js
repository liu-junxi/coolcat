document.body.onselectstart = document.body.oncontextmenu = function () { return false; }

var fs = require("fs");

const prompt = require('electron-prompt');

const main0 = document.getElementById("main0");

//等待时间
const time = 400;
//刷新等待 
const time1 = 600

// path_1是保存路径的数组
var path_1 = []
if (localStorage.index_t == "word") {
    path_1[0] = "/home/" + useid + "/文档/"
} else if (localStorage.index_t == "dow") {
    path_1[0] = "/home/" + useid + "/下载/"
} else {
    path_1[0] = "/home/" + useid + "/"
}

// path_2是保存当前路径子目录的数组
var path_2 = []

// path_copy是保存粘贴功能的路径
var path_copy = null
// p_name是粘贴时的文件名字
var p_name = null
//p_t为true表示正处于剪切模式
var p_t = false



//获取子目录，及判断子目录的类型（文件/文件夹）
path_2 = Judge_Path(path_1[path_1.length - 1])
setTimeout(() => {

    x()
}, time);


var time_plus 

//更新变化区域的页面内容
function x() {
    path_k.value = path_1[path_1.length - 1]
     create_j(path_2,[],[],(re)=>{
        main0.innerHTML =re
        tap1()//绑定右键事件
    tap_2()
    create_s(path_2, (a, list, i, b) => {
        a.ondblclick = function () {
            path_2 = Judge_Path(path_1[path_1.length - 1] + list[i] + "/")
            path_1[path_1.length] = path_1[path_1.length - 1] + list[i] + "/"

            setTimeout(x, time);
            a.ondblclick = null;

        }

        a.onclick = function () {
            var siblings = this.parentNode.querySelectorAll('div');
            var ppp=document.getElementsByClassName("ppp")
            for (let i = 0; i < ppp.length; i++) {
                ppp[i].scrollTop=0
            }
            
            for (let i = 0; i < siblings.length; i++) {
                siblings[i].style.backgroundColor = 'transparent';
                siblings[i].style.border = '0';
                
            }
            this.style.border = '0.5px solid #33D4FF';
            this.style.backgroundColor = '#DAF5FF';
            // this.scrollTop=100
            var x = (b.style.width).slice(0, (b.style.width).length - 2)
            
            console.log(b.scrollTop)
            clearInterval(time_plus)
            //计数器
            var l=0
            function plus() {
                if (l>=100) {
                    l=0
                    b.scrollTop = 0
                }
                else {
                    // console.log(b.scrollTop)
                    l++
                    b.scrollTop++
                }
            }
            time_plus = setInterval(() => {
                plus()
            }, 20);
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


