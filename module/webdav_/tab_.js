document.body.onselectstart = document.body.oncontextmenu = function () { return false; }
// 导航栏顶部菜单
var prompt = require('electron-prompt')
var top_back = document.getElementById("top_back")
var top_go = document.getElementById("top_go")
var top_retreat = document.getElementById("top_retreat")
var path_copy = ""
var path_copy_c = ""
var path_list_n = ""
//path_3保存历史路径
var path_3 = []
var dd_time = true;
top_back.onclick = function () {
    if (path_1.length >= 2) {
        x(path_1[path_1.length - 2])
        path_1.splice(path_1.length - 1, 1)
        dd_time = false
    }
}



top_retreat.onclick = function () {
    if (path_1.length >= 2 && dd_time) {
        x(path_1[path_1.length - 2])
        path_3.push(path_1[path_1.length - 1])
        path_1.splice(path_1.length - 1, 1)
        dd_time = false
    }

    top_go.onclick = function () {
        var m = path_3.length
        if (m > 0 && dd_time) {
            x(path_3[0])
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
                    // console.log("下载")
                    if (path_list[path_list.length / 2 + bay] == 1) {
                        alert("暂不支持下载目录")
                    }
                    else {
                        var dow = client.getFileDownloadLink(path_1[path_1.length - 1] + path_list[bay])
                        console.log(path_1[path_1.length - 1] + path_list[bay])
                        console.log(dow)
                        prompt({
                            title: '下载',
                            label: '点击"ok"开始下载，将保存到：' + dow_path,
                            value: dow,
                            type: 'input'
                        }).then((r) => {
                            if (r === null) {
                                // console.log("ok")
                                // console.log(r)
                            } else {
                                // console.log("no")
                                localStorage.jdt_typ = "dow"
                                localStorage.jdt = 0
                                new_jdt()
                                dow_file(dow, dow_path + path_list[bay], () => {
                                    localStorage.jdt = 100
                                })
                            }
                        }).catch(console.error);
                        // console.log(n.filename)

                    }


                    break;

                case "复制(C)":
                    path_copy = path_1[path_1.length - 1] + path_list[bay]
                    path_copy_n = path_list[bay]


                    break;

                case "剪切(T)":
                    path_copy = path_1[path_1.length - 1] + path_list[bay]
                    path_copy_n = path_list[bay]
                    path_copy_c = "true"
                    break


                case "删除(D)":
                    console.log("删除" + path_list)

                    if (path_list[0.5 * path_list.length + bay] == 1) {
                        alert("不支持删除目录")
                    } else {
                        client.deleteFile(path_1[path_1.length - 1] + path_list[bay])

                        setTimeout(() => {
                            x(path_1[path_1.length - 1])
                        }, 1000)
                    }

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
                case "新建文件夹(F)":
                    const prompt = require('electron-prompt');
                    prompt({
                        title: '新建文件夹',
                        label: '请输入文件夹的命名',
                        value: "新建文件夹",
                        type: 'input'
                    }).then((r) => {
                        if (r === null) {
                            console.log("ok")
                            console.log(r)
                        } else {
                            console.log(path_1[path_1.length - 1] + "/" + r)
                            client.createDirectory(path_1[path_1.length - 1] + r)
                            console.log(r)
                            console.log("no")
                            setTimeout(() => {
                                x(path_1[path_1.length - 1])
                            }, 1000)

                        }
                    }).catch(console.error);
                    // console.log(n.filename)
                    break

                case "刷新(E)":
                    // console.log("刷了")
                    x(path_1[path_1.length - 1])
                    break;
                case "黏贴(P)":
                    if (path_copy != "") {
                        if (path_copy_c == "true") {
                            client.moveFile(path_copy, path_1[path_1.length - 1] + path_copy_n)
                            path_copy_c = ""
                        } else {
                            // console.log(path_copy+"+++++"+ path_1[path_1.length - 1])
                            client.copyFile(path_copy, path_1[path_1.length - 1] + path_copy_n)
                            path_copy = ""
                        }
                        setTimeout(() => {
                            x(path_1[path_1.length - 1])
                        }, 1000)
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
                localStorage.up_type1 = "webdav"
                localStorage.up_type = 0
                break;
            case 1:
                localStorage.up_type1 = "webdav"
                localStorage.up_type = 1
                break;
            case 2:
                x("/")

                break;
        }
    }
}



// var a=client.getFileDownloadLink("hello/1.png")
// console.log(a)

//client.putFileContents("/hello/1.png",fs.readFileSync(`f:/1.png`))

//上传功能
if (localStorage.webdav_ == "true") {
    localStorage.webdav_ = "false"
    // var fs = require("fs")
    if (localStorage.up_type == 1) {
        console.log("上传文件夹")
        console.log(localStorage.bdy_name)//文件夹名字
        var ff = localStorage.bdy_path
        console.log(ff)//文件夹路径
        get_feles_path(ff, (e) => {
            var path = require("path")
            var paths = []
            //在云端创建文件夹
            console.log(e)
            e.forEach(element => {
                var size = element.split("/").length
                
                    var s = []
                    var s1 = element
                    for (let v = 0; v < size - 1; v++) {
                        var n = path.dirname(s1)
                        s.push(n)
                        s1 = n
                    }
                    paths.push(s)
               
            });
            client.createDirectory("/酷猫云盘管理器/" + localStorage.bdy_name)
            console.log(paths)

            localStorage.jdt = 0
            new_jdt()

            var fs = require("fs")
            
        })


    } else if (localStorage.up_type == 0) {
        //上传文件
        console.log("上传文件")
        console.log(localStorage.bdy_name)//文件夹名字
        var ff = localStorage.bdy_path
        console.log(ff)//文件夹路径 
        localStorage.jdt = 0
        new_jdt()
        setTimeout(() => {
            client.putFileContents("/酷猫云盘管理器/" + localStorage.bdy_name, fs.readFileSync(ff), {
                onUploadProgress: progress => {
                    localStorage.jdt = Number(progress.loaded) / Number(progress.total) * 100

                    console.log(`Uploaded ${progress.loaded} bytes of ${progress.total}`);
                }
            });
        }, 500)



    }
}



//文件下载
function dow_file(url, filename, callback) {
    var request = require('request')
    var fs = require('fs')
    var stream = fs.createWriteStream(filename);
    request(url).pipe(stream).on('close', callback);
}



var r = require('electron').remote
var type_s = r.getGlobal('aname').yourmsg
setInterval(() => {
    if (type_s != r.getGlobal('aname').yourmsg) {
        x(path_1[path_1.length - 1])
        type_s = r.getGlobal('aname').yourmsg
    }
}, 50)
