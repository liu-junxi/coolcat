document.body.onselectstart = document.body.oncontextmenu = function () { return false; }
var cookie
var access_token

read_txt(yhsj+ '/information/bdy.txt', (information) => {
    var s = 3 + localStorage.bdy * 3
    cookie = information[s + 1]
    access_token = information[s + 2]

    x("/", access_token, cookie)
})

// path_1是保存路径的数组
var path_1 = []
path_1[0] = "/"
// path_list保存当前目录下的所有子目录的名字
var path_list = []
//path_list_f保存当前目录下的所有子目录的fs_id
var path_list_f = []
const main0 = document.getElementById("main0");


// 调用百度云接口
//type可选"post"或"get"
//host 是请求头中的host
//date是post方式提交的数据。get方式时可以不填
function do_bdy(type, path, host, cookie, callback, date) {
    var request = require('request')
    var option_get = {
        url: path,
        method: 'GET',
        headers: {
            Host: host,
            Cookie: cookie
        }
    }
    var option_post = {
        url: path,
        method: 'POST',
        headers: {
            Host: host,
            Cookie: cookie
        },
        form: date
    }
    if (type === "get") {
        option = option_get
    } else if (type === "post") {
        option = option_post
    }
    request(
        option, function (err, response, body) {
            //err 当前接口请求错误信息
            //response 一般使用statusCode来获取接口的http的执行状态
            //body 当前接口response返回的具体数据 返回的是一个jsonString类型的数据 
            if (err) {
                console.log(err)
            }
            if (!err && response.statusCode == 200) {
                var res = JSON.parse(body);

                callback(res)
            }
        }
    )

}

var time_plus
// 刷新页面内容
function x(path, access_token, cookie) {

    path_k.value = path

    var url = "https://pan.baidu.com/rest/2.0/xpan/file?method=list&access_token=" + access_token + "&dir=" + path
    url = encodeURI(url)

    do_bdy("get", url, 'pan.baidu.com', cookie, function (date) {
        console.log(date)
        var name = []
        var stye = []
        var size = []
        
        var fs_id = []
        date.list.forEach(element => {
            fs_id.push(element['fs_id'])
            name.push(element['server_filename'])
            stye.push(element['isdir'])
            size.push(element['size'])
            
        });
        path_list_f = fs_id
        path_list = name.concat(stye)
        create_j(path_list, size, [], (res) => {
            main0.innerHTML = res

            tap1()
            tap_2()

            create_s(name.concat(stye), (a, list, i, b) => {
                a.ondblclick = function () {
                    if (list[list.length / 2 + i] == 1) {

                        path_1[path_1.length] = path_1[path_1.length - 1] + list[i] + "/"

                        x(path_1[path_1.length - 1], access_token, cookie)
                        a.ondblclick = null;
                    }

                }

                a.onclick = function () {
                    var siblings = this.parentNode.querySelectorAll('div');
                    var ppp = document.getElementsByClassName("ppp")
                    for (let i = 0; i < ppp.length; i++) {
                        ppp[i].scrollTop = 0
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
                    var l = 0
                    function plus() {
                        if (l >= 100) {
                            l = 0
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

            })
        })


    })
}




// 删除目录
function deleteFolder(path, callback) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file) {
            var curPath = path + "/" + file;
            fs.unlinkSync(curPath);
        });
        fs.rmdir(path, function () {
            callback()
        });
    }
};




//上传功能
if (localStorage.bdy_ == "true") {
    localStorage.bdy_ = "false"
    var fs = require("fs")
    if (localStorage.up_type == 1) {
        console.log("上传文件夹")
        console.log(localStorage.bdy_name)//文件夹名字
        var ff = localStorage.bdy_path
        console.log(ff)//文件夹路径
        get_feles_path(ff, (e) => {
            localStorage.jdt = 0
            new_jdt()
            // console.log(e)
            // 上传文件
            var fs = require("fs")
            var n
            d(0)
            var l = 0//计数器
            function d(i) {
                fs.stat(ff + "/" + e[i], (err, stats) => {
                    console.log(ff + "/" + e[i] + "---" + i)
                    if (err) { console.log(err) }
                    var size = stats.size.toString()
                    if (e[i].lastIndexOf("/") == -1) {
                        n = e[i]
                    } else {
                        n = e[i].slice(e[i].lastIndexOf("/") + 1)
                    }

                    sc(ff + "/" + e[i], n, size, localStorage.bdy_name + "/" + e[i], () => {
                        // console.log("完成了")
                        if (l < e.length - 1) {
                            // console.log(l+"---"+e.length)
                            l++
                            setTimeout(() => {
                                localStorage.jdt = ((l + 1) / e.length) * 100
                                console.log(localStorage.jdt)
                                d(l)
                            }, 2000)

                        } else {
                            l = 0
                        }

                    })

                })
            }
        })



    } else if (localStorage.up_type == 0) {
        //上传文件
        var fs = require("fs")
        fs.stat(localStorage.bdy_path, (err, stats) => {
            var size = stats.size.toString()

            sc(localStorage.bdy_path, localStorage.bdy_name, size, localStorage.bdy_name, () => {
                console.log("完成了")
            })

            localStorage.jdt = 0
            new_jdt()

        })
    }

}




//文件下载
function dow_file(url, cookie, filename, callback) {
    const request = require('request')
    const fs = require('fs')
    var stream = fs.createWriteStream(filename);
    request({
        url: url,
        method: 'GET',
        headers: {
            'Host': 'd.pcs.baidu.com',
            'Cookie': cookie
        }
    }).pipe(stream).on('close', callback);
}

// setTimeout(()=>{
//     dow_file("https://d.pcs.baidu.com/file/fc6600dd00c877cdcd49ceca41108a8a?fid=2223124942-250528-16997913212146&rt=pr&sign=FDtAERV-DCb740ccc5511e5e8fedcff06b081203-IV4D3xgg0Z6OKRboGXnY622C2WI%3D&expires=8h&chkbd=0&chkv=2&dp-logid=3574246613829829454&dp-callid=0&dstime=1591707663&r=545434016",
// cookie,"4.rar",()=>{
//     console.log("完成了")
// })
// },400)