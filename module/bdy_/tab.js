const prompt = require('electron-prompt');

// document.body.onselectstart = document.body.oncontextmenu = function () { return false; }
// 导航栏顶部菜单
var top_back = document.getElementById("top_back")
var top_go = document.getElementById("top_go")
var top_retreat = document.getElementById("top_retreat")
//path_3保存历史路径
var path_3 = []
top_back.onclick = function () {
    if (path_1.length >= 2) {
        x(path_1[path_1.length - 2], access_token, cookie)
        path_1.splice(path_1.length - 1, 1)
    }
}



top_retreat.onclick = function () {
    if (path_1.length >= 2) {
        x(path_1[path_1.length - 2], access_token, cookie)
        path_3.push(path_1[path_1.length - 1])
        path_1.splice(path_1.length - 1, 1)
    }

    top_go.onclick = function () {
        var m = path_3.length
        if (m > 0) {
            x(path_3[0], access_token, cookie)
            path_1.push(path_3[0])
            path_3.splice(0, 1)
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
                        if_file(access_token, cookie, path_list_f[bay], (e) => {
                            var n = e.list[0]
                            prompt({
                                title: '下载',
                                label: '点击"ok"开始下载，将保存到：' + dow_path,
                                value: n.dlink,
                                type: 'input'
                            })
                                .then((r) => {
                                    if (r === null) {
                                        // console.log("ok")
                                        // console.log(r)
                                    } else {
                                        // console.log(path_list[bay])
                                        // console.log("no")
                                        localStorage.jdt_typ="dow"
                                        localStorage.jdt = 0
                                        new_jdt()
                                        dow_file(n.dlink, cookie,dow_path+ path_list[bay], () => {
                                            localStorage.jdt = 100
                                        })
                                    }
                                })
                                .catch(console.error);
                            // console.log(n.filename)
                        })
                    }


                    break;

                case "复制(C)":
                    path_copy = path_1[path_1.length - 1] + path_list[bay]


                    break;


                case "删除(D)":
                    // console.log("删除"+path_list[bay])
                    d_file("delete", access_token, cookie, path_1[path_1.length - 1] + path_list[bay])
                    setTimeout(() => {
                        x(path_1[path_1.length - 1], access_token, cookie)
                    }, 1000)
                    break;

                case "重命名(M)":
                    // console.log("重命名");

                    prompt({
                        title: '重命名',
                        label: '输入新的命名',
                        value: path_list[bay],
                        type: 'input'
                    }).then((r) => {
                            if (r === null) {
                                console.log('user cancelled');
                            } else {
                                if (path_list.indexOf(r) == -1) {
                                    d_file("rename", access_token, cookie, path_1[path_1.length - 1] + path_list[bay], r)
                                    alert("重命名成功")
                                    setTimeout(() => {
                                        x(path_1[path_1.length - 1], access_token, cookie)
                                    }, 2500)
                                } else {
                                    alert("该名字已被占用")
                                }
                            }
                        })
                        .catch(console.error);


                    break;

                case "属性(A)":
                    if_file(access_token, cookie, path_list_f[bay], (e) => {
                        var n = e.list[0]
                        console.log(n)
                        
                        alert("名称：" + n.filename
                            + "\n路径：" + n.path
                            + "\nmd5值：" + n.md5
                            + "\n大小(B)：" + n.size,
                            
                        )

                    })
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
                    x(path_1[path_1.length - 1], access_token, cookie)
                    break;
                case "黏贴(P)":
                    if (path_copy != null) {
                        d_file("copy", access_token, cookie, path_copy, path_1[path_1.length - 1])
                        path_copy = null
                        setTimeout(() => {
                            x(path_1[path_1.length - 1], access_token, cookie)
                        }, 2000)
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
                localStorage.up_type1 = "bdy"
                localStorage.up_type = 0
                break;
            case 1:
                localStorage.up_type1 = "bdy"
                localStorage.up_type = 1
                break;
            case 2:
                x("/", access_token, cookie)
                path_1[path_1.length] = "/"
                break;

        }

    }

}



var r = require('electron').remote
var type_s = r.getGlobal('aname').yourmsg
setInterval(() => {
    if (type_s != r.getGlobal('aname').yourmsg) {
        x(path_1[path_1.length - 1], access_token, cookie)
        type_s = r.getGlobal('aname').yourmsg
    }
}, 10)