//记录被触发右键菜单的文件夹的编号
var bay = 0;

//右键点击文件夹时出现的菜单
function tap1() {
    

    // 获取 文件夹 数组
    var folders = this.document.querySelector(".right").querySelectorAll("div");
    // console.log(folders.length)
    // 获取菜单
    var menu = this.document.querySelector('.menu');

    var lis = menu.querySelectorAll("li");

    for (let i = 0; i < lis.length; i++) {

        lis[i].onmousedown = function (event) {
            //console.log(this.innerText);
            switch (this.innerText) {
                case "打开(O)":
                    console.log('打开')
            
                    break;
                case "复制(C)":
                    console.log('复制')
                    path_copy = path_1[path_1.length - 1] + path_2[bay] + "/"
                    p_name = path_2[bay]
                    break;
                case "剪切(T)":
                    console.log('剪切')
                    path_copy = path_1[path_1.length - 1] + path_2[bay] + "/"
                    p_name = path_2[bay]
                    p_t = true
                    break;
                case "删除(D)":
                    console.log('删除')
                    delete_(path_1[path_1.length - 1] + path_2[bay])
                    x2()
                    break;
                case "重命名(M)":
                    prompt({
                        title: '重命名',
                        label: '输入新的命名',
                        value: path_2[bay],
            
                        type: 'input'
                    })
                        .then((r) => {
                            if (r === null) {
                                console.log('user cancelled');
                            } else {
                                if (path_2.indexOf(r) == -1) {
                                    rename(path_1[path_1.length - 1] + path_2[bay], path_1[path_1.length - 1] + r)
                                    alert("重命名成功")
                                    x2()
                                } else {
                                    alert("该名字已被占用")
                                }
            
                            }
                        })
                        .catch(console.error);
                    break;
                case "属性(A)":
                    getAttribute(path_1[path_1.length - 1] + path_2[bay])
                    break;
            
            }
            menu.style.display = "none";
            event.stopPropagation()
        }
    }


    // 右键菜单模块
    for (let i = 0; i < folders.length; i++) {
        folders[i].index = i;

        folders[i].oncontextmenu = function (event) {
            var siblings = this.parentNode.querySelectorAll('div');
            for (let i = 0; i < siblings.length; i++) {
                siblings[i].style.backgroundColor = 'transparent';
                siblings[i].style.border = '0';
            }
            this.style.border = '0.5px solid #33D4FF';
            this.style.backgroundColor = '#DAF5FF';
            document.querySelector('.menu2').style.display = "none"
            var event = event || window.event
            event.preventDefault() //阻止默认事件
            event.stopPropagation()
            bay = i
            event.returnValue = false
            var clientWidth = document.documentElement.clientWidth
            var clientHeight = document.documentElement.clientHeight
            menu.style.display = 'block'
            //基于当前可视区的
            if (clientHeight - event.pageY >= menu.offsetHeight) {
                menu.style.top = event.pageY + 'px'
            } else {
                menu.style.top = (event.pageY - menu.offsetHeight) + 'px'
            }
            if (clientWidth - event.pageX >= menu.offsetWidth) {
                menu.style.left = event.pageX + 'px'
            } else {
                menu.style.left = (event.pageX - menu.offsetWidth) + 'px'
            }

            if (event.button == 0) {
                console.log("你点了左键");
                menu.style.display = "none";
                //     }
            }
        }
        document.onmousedown = function () {
            if (e.button == 0) {
                // console.log("你点了左键");
                menu.style.display = "none";
            }
        }

    }
}

//点击空白区域时出现的菜单


function tap_2() {
    var menu = this.document.querySelector('.menu2');

    var lis = menu.querySelectorAll("li");

    for (let i = 0; i < lis.length; i++) {

        lis[i].onmousedown = function (event) {
            //console.log(this.innerText);
            switch (this.innerText) {
                case "新建文本文件(w)":
                    createFile(path_1[path_1.length - 1])
                    x2()
            
                    setTimeout(x, time + time1);
                    break;
                case "新建文件夹(F)":
                    // console.log(path_1[path_1.length-1])
                    createfolder(path_1[path_1.length - 1])
                    x2()
                    break;
                case "刷新(E)":
                    path_2 = Judge_Path(path_1[path_1.length - 1])
                    setTimeout(x, time);
                    break;
                case "黏贴(P)":
                    if (path_copy != null) {
                        copy_(path_copy, path_1[path_1.length - 1], p_name)
                        if (p_t) {
                            setTimeout(() => {
                                delete_(path_copy)
                                path_copy = null
                            }, 5000)
            
                        }
            
                        x2()
                    }
                    break;
            }
            menu.style.display = "none";
            event.stopPropagation()
        }
    }

    document.getElementById("main0").oncontextmenu = function (event) {
        
        document.querySelector('.menu').style.display = "none"

        var siblings = this.parentNode.querySelectorAll('div');
            for (let i = 0; i < siblings.length; i++) {
                siblings[i].style.backgroundColor = 'transparent';
                siblings[i].style.border = '0';
            }

        var event = event || window.event
        event.preventDefault() //阻止默认事件
        event.stopPropagation()

        
        event.returnValue = false
        var clientWidth = document.documentElement.clientWidth
        var clientHeight = document.documentElement.clientHeight
        menu.style.display = 'block'
        //基于当前可视区的
        if (clientHeight - event.pageY >= menu.offsetHeight) {
            menu.style.top = event.pageY + 'px'
        } else {
            menu.style.top = (event.pageY - menu.offsetHeight) + 'px'
        }
        if (clientWidth - event.pageX >= menu.offsetWidth) {
            menu.style.left = event.pageX + 'px'
        } else {
            menu.style.left = (event.pageX - menu.offsetWidth) + 'px'
        }

        if (event.button == 0) {
            console.log("你点了左键");
            menu.style.display = "none";
            //     }
            document.querySelector('.menu').style.display = "none";
        }
        
    }
    document.onmousedown = function (e) {
        if (e.button == 0) {
            console.log("你点了左键");
            menu.style.display = "none";
            document.querySelector('.menu').style.display = "none";
        }
    }
    
    
}


// 导航栏顶部菜单
var top_back = document.getElementById("top_back")
var top_go = document.getElementById("top_go")
var top_retreat = document.getElementById("top_retreat")
//path_3保存历史路径
var path_3 = []
top_back.onclick = function () {
    if (path_1.length >= 2) {
        path_2 = Judge_Path(path_1[path_1.length - 2])
        setTimeout(x, time);
        path_1.splice(path_1.length - 1, 1)
    }
}



top_retreat.onclick = function () {
    if (path_1.length >= 2) {
        path_2 = Judge_Path(path_1[path_1.length - 2])
        setTimeout(x, time);
        path_3.push(path_1[path_1.length - 1])
        path_1.splice(path_1.length - 1, 1)
    }

    top_go.onclick = function () {
        var m = path_3.length
        if (m > 0) {
            path_2 = Judge_Path(path_3[0])
            path_1.push(path_3[0])
            path_3.splice(0, 1)
            setTimeout(x, 400);
        }
    }
}


//左侧菜单
var tap_left = this.document.querySelector("#tab_left");

var tap_left_lis = tap_left.querySelectorAll("li");
for (let j = 0; j < tap_left_lis.length; j++) {
    // console.log("haha")
    tap_left_lis[j].index = j
    tap_left_lis[j].onclick = function () {
        switch (this.index) {
            case 0:
                x1("/home/" + useid + "/")
                break;
            case 1:
                x1("/home/" + useid + "/" + "桌面" + "/")
                break;
            case 2:
                x1("/home/" + useid + "/" + "视频" + "/")
                break;
            case 3:
                x1("/home/" + useid + "/" + "图片" + "/")
                break;
            case 4:
                x1("/home/" + useid + "/" + "文档" + "/")
                break;
            case 5:
                x1("/home/" + useid + "/" + "下载" + "/")
                break;
            case 6:
                x1("/home/" + useid + "/" + "音乐" + "/")
                break;
            case 7:
                x1("/")

                break;
        }

    }

}





// 一些模块


// 在判断dst目录是否存在，存在直接调用函数，不存在就先创建目录再调用
function exists(src, dst, callback) {
    fs.exists(dst, function (exists) {
        // 已存在
        if (exists) {
            callback(src, dst);
        }
        // 不存在
        else {
            fs.mkdir(dst, function () {
                callback(src, dst);
            });
        }
    });
};

// 创建文件夹模块函数
var wjj = "新建文件夹"
var gg = 1

function createfolder(path) {
    var dst1 = path + wjj
    fs.exists(dst1, function (exists) {
        // 已存在
        if (exists) {
            wjj = "新建文件夹" + gg
            gg++
            // console.log(gg)
            createfolder(path)
        }
        // 不存在
        else {
            fs.mkdir(dst1, function (err) {
                if (err) {
                    console.log(err)
                }
            })
            gg = 1
        }
    });
}

// 创建文件模块函数
var wj = "新建文件.txt"
var gg1 = 1

function createFile(path) {
    var dst1 = path + wj
    //  console.log(dst1)
    fs.exists(dst1, function (exists) {
        // 已存在
        if (exists) {
            wj = "新建文件" + gg1 + ".txt"
            gg1++
            createFile(path)
        }
        // 不存在
        else {

            fs.writeFile(dst1, "", function (err) {
                if (err) {
                    return console.log(err);
                }
            });
            gg1 = 1
        }
    });
}

// 获得属性模块
function getAttribute(path) {
    fs.stat(path, (err, stats) => {
        if (err) {
            console.log(`fs.stats ${path} file failed~`);
        } else {
            //   console.log(`fs.stats ${path} file success~`);
            console.log(stats);
            alert("大小(B)：" + stats.size + "\n权限："
                + stats.mode + "\n创建时间："
                + stats.ctime + "\n最后修改时间："
                + stats.mtime)
        }
    });
}

//复制模块
function copy_(path, path_re, name) {
    path = path.slice(0, path.length - 1)
    if (path === path_re + name) {
        alert("已存在")
    }
    fs.stat(path, function (err, stats) {
        if (stats.isFile()) {
            copyFile(path, path_re + name)
        } else {
            exists(path, path_re + name, copy)
        }
    })
}


//复制文件
function copyFile(path, path_re) {
    fs.copyFile(path, path_re, (err) => {
        if (err) throw err;
        // console.log('源文件已拷贝到目标文件');
    });
}

//复制目录
function copy(src, dst) {
    // 读取目录中的所有文件/目录
    fs.readdir(src, function (err, paths) {
        if (err) {
            throw err;
        }
        paths.forEach(function (path) {
            console.log(path)
            var _src = src + '/' + path,
                _dst = dst + '/' + path,
                readable, writable;
            console.log(_src)
            fs.stat(_src, function (err, st) {
                if (err) {
                    throw err;
                }
                // 判断是否为文件
                if (st.isFile()) {
                    // 创建读取流
                    readable = fs.createReadStream(_src);
                    // 创建写入流
                    writable = fs.createWriteStream(_dst);
                    // 通过管道来传输流
                    readable.pipe(writable);
                }
                // 如果是目录则递归调用自身
                else if (st.isDirectory()) {
                    exists(_src, _dst, copy);
                }
            });
        });
    });
};


//删除模块
function delete_(path) {
    fs.stat(path, function (err, stats) {
        if (stats.isFile()) {
            deleteFile(path)
        } else {
            deleteFolder(path)
        }
    })
}



//删除文件
function deleteFile(path) {
    fs.unlink(path, function (err) {
        if (err) {
            throw err;
        }
        // console.log("文件删除成功！");
    });
}

//删除目录
function deleteFolder(path) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

//重命名目录或文件
function rename(path, rename) {
    fs.rename(path, rename, function (err) {
        if (!err) {
            // console.log("重命名成功");
        }
    });
}



var exec = require('child_process').execSync
//useid是用户名
var whoami = exec('whoami').toString()
var useid = whoami.slice(whoami.indexOf('\\') + 1, whoami.length - 1)
var yhsj = "/home/" + useid + "/.config/coolcat"
var fs = require("fs");
fs.writeFile(yhsj+"/information/swicth/1.txt", '0',  function(err) {
    if(err){
        console.log(err)
    }
});



var r = require('electron').remote
var type_s = r.getGlobal('aname').yourmsg
setInterval(() => {
    if (type_s != r.getGlobal('aname').yourmsg) {
        path_2 = Judge_Path(path_1[path_1.length - 1])
                    setTimeout(x, time);
        type_s = r.getGlobal('aname').yourmsg
    }
}, 50)