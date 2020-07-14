const prompt = require('electron-prompt');

// document.body.onselectstart = document.body.oncontextmenu = function () { return false; }
// 导航栏顶部菜单
var top_back = document.getElementById("top_back")
var top_go = document.getElementById("top_go")
var top_retreat = document.getElementById("top_retreat")
//path_3保存历史路径
var path_3 = []
var dd_time = true;
top_back.onclick = function () {
    if (path_1.length >= 2 && dd_time) {
        ViewCatalog(path_1[path_1.length - 2])
        path_1.splice(path_1.length - 1, 1)
        dd_time = false
    }
}



top_retreat.onclick = function () {
    if (path_1.length >= 2 && dd_time) {
        ViewCatalog(path_1[path_1.length - 2])
        path_3.push(path_1[path_1.length - 1])
        path_1.splice(path_1.length - 1, 1)
        dd_time = false
    }

    top_go.onclick = function () {
        var m = path_3.length
        if (m > 0 && dd_time) {
            ViewCatalog(path_3[0])
            path_1.push(path_3[0])
            path_3.splice(0, 1)
            dd_time = false
        }
    }
}

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
                case "下载(W)":
                    if (path_list[path_list.length / 2 + bay] == 1) {
                        alert("暂不支持下载目录")
                    }
                    else {

                        prompt({
                            title: '下载',
                            label: '点击"ok"开始下载，将保存到：' + dow_path,
                            value: "--------------",
                            type: 'input'
                        })
                            .then((r) => {
                                if (r === null) {
                                    // console.log("ok")
                                    // console.log(r)
                                } else {
                                    // console.log("no")
                                    localStorage.jdt_typ = "dow"
                                    localStorage.jdt = 0
                                    new_jdt()
                                    dow_file(path_1[path_1.length - 1] + path_list[bay], dow_path + path_list[bay], () => {
                                        localStorage.jdt = 100
                                    })
                                }
                            })
                            .catch(console.error);
                        // console.log(n.filename)

                    }
                    break;



                case "删除(D)":
                    // console.log("删除"+path_list[bay])
                    delete_(path_1[path_1.length - 1] + path_list[bay])
                    setTimeout(() => {
                        ViewCatalog(path_1[path_1.length - 1])
                    }, 1500)

                    //获取文件信息
                    function readdir(path, callback) {
                        var c = new Client();
                        c.connect(connectionProperties);
                        var files = []
                        var files_t = []
                        c.on('ready', function () {
                            c.list(path, function (err, list) {
                                if (err) throwerr;

                                list = list.slice(2)
                                // console.log(list)
                                list.forEach(element => {
                                    // console.log(element)
                                    files.push(iconv.decode(element['name'], 'utf-8'))
                                    if (element['type'] == '-') {
                                        files_t.push("0")
                                    } else {
                                        files_t.push("1")
                                    }

                                });
                                c.destroy()

                                callback(files, files_t)

                            })
                        });


                    }

                    function delete_(path) {
                        var c = new Client();
                        c.connect(connectionProperties);
                        console.log(path)
                        readdir(path, (a, b) => {
                            // console.log(b)
                            a.forEach(function (file, index) {
                                var curPath = path + "/" + file;
                                if (b[index] == "1") { // recurse
                                    delete_(curPath);
                                } else { // delete file
                                    c.delete(curPath, (e) => { })
                                }
                            });

                            c.rmdir(path, function (err) {
                                if (err) {
                                    console.log(err)
                                    c.delete(path, (e) => { })
                                }
                                c.end()
                            })

                        })

                    }
                    break;

                case "重命名(M)":
                    // console.log("重命名");

                    prompt({
                        title: '重命名',
                        label: '输入新的命名',
                        value: path_list[bay],
                        type: 'input'
                    })
                        .then((r) => {
                            if (r === null) {
                                console.log('user cancelled');
                            } else {
                                if (path_list.indexOf(r) == -1) {
                                    rename(path_1[path_1.length - 1] + path_list[bay], path_1[path_1.length - 1] + r)
                                    alert("重命名成功")
                                    setTimeout(() => {
                                        ViewCatalog(path_1[path_1.length - 1])
                                    }, 1500)
                                } else {
                                    alert("该名字已被占用")
                                }
                            }
                        })
                        .catch(console.error);


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

                case "刷新(E)":
                    // console.log("刷了")
                    ViewCatalog(path_1[path_1.length - 1])
                    break;
                case "新建文件夹(F)":
                    createfolder(path_1[path_1.length - 1])

                    setTimeout(() => {
                        ViewCatalog(path_1[path_1.length - 1])
                    }, 500)

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
            // console.log("你点了左键");
            menu.style.display = "none";
            //     }
            document.querySelector('.menu').style.display = "none";
        }

    }
    document.onmousedown = function (e) {
        if (e.button == 0) {
            // console.log("你点了左键");
            menu.style.display = "none";
            document.querySelector('.menu').style.display = "none";
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
                localStorage.up_type1 = "ftp"
                localStorage.up_type = 0
                break;
            case 1:
                localStorage.up_type1 = "ftp"
                localStorage.up_type = 1
                break;
            case 2:
                ViewCatalog("/")
                break;

        }

    }

}

setTimeout(() => {
    // "‪D:/day/新建文件夹/a.png"
    // up("d:/day/新建文件夹/a.png","/a.png")
    // dow('/哈哈1.txt','d:/foo.local-copy.txt')
}, 3000)

//下载文件
function dow_file(url, filePath, callback) {
    var fs = require('fs');
    var c = new Client();
    c.on('ready', function () {
        c.get(url, function (err, stream) {
            if (err) throw err;
            stream.once('close', function () { c.end(); });
            stream.pipe(fs.createWriteStream(filePath));
            callback()
        });
    });
    // connect to localhost:21 as anonymous
    c.connect(connectionProperties);
}


//上传单个文件

function up(p, s, callback) {
    var Client = require('ftp');
    var fs = require('fs');

    var c = new Client();
    c.on('ready', function () {
        c.put(fs.createReadStream(p), s, function (err) {

            c.end();
            callback(err)
        });
    });
    // connect to localhost:21 as anonymous
    c.connect(connectionProperties);
}





//上传功能
if (localStorage.ftp_ == "true") {
    localStorage.ftp_ = "false"
    var fs = require("fs")
    if (localStorage.up_type == 1) {
        console.log("上传文件夹")
        console.log(localStorage.bdy_name)//文件夹名字
        var ff = localStorage.bdy_path
        console.log(ff)//文件夹路径
        setTimeout(() => {

            get_feles_path(ff, (e) => {
                localStorage.jdt = 0
                new_jdt()
                console.log(e)
                // 上传文件夹
                var fs = require("fs")
                var n
                UP_(0)
                var m = e.length
                var l = 0//计数器
                function UP_(i) {
                    console.log(ff + "/" + e[i] + "---" + i)

                    if (e[i].lastIndexOf("/") == -1) {
                        n = e[i]
                    } else {
                        n = e[i].slice(e[i].lastIndexOf("/") + 1)
                    }

                    up(ff + "/" + e[i], n, (err) => {
                        if (!err) {
                            if (l < m - 1) {
                                console.log(l + "---" + m)
                                l++
                                setTimeout(() => {
                                    localStorage.jdt = ((l + 1) / m) * 100
                                    console.log(localStorage.jdt)
                                    UP_(l)
                                }, 2000)

                            } else {
                                l = 0
                            }
                        }
                    })


                }
            })

        }, 1000)



    } else if (localStorage.up_type == 0) {
        //上传文件
        console.log("上传文件")
        console.log(localStorage.bdy_name)//文件夹名字
        var ff = localStorage.bdy_path
        // console.log(ff)//文件路径
        var fs = require('fs')
        setTimeout(() => {
            localStorage.jdt = 0
            new_jdt()
            up(ff, localStorage.bdy_name, (err) => {
                if (!err) {
                    localStorage.jdt = 100
                    // console.log("上传完成")
                }
            })

        }, 500)

    }

}

