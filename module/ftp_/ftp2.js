document.body.onselectstart = document.body.oncontextmenu = function () { return false; }

const main0 = document.getElementById("main0");

var Client = require('ftp');
var iconv = require('iconv-lite');


//连接参数
var n1, n2, n3, n4
let connectionProperties = {}

// path_1是保存路径的数组
var path_1 = []
path_1[0] = "/"
// path_list保存当前目录下的所有子目录的名字
var path_list = []


const { setInterval } = require('timers');

read_txt(yhsj + '/information/information.txt', (information) => {
    var s = 5 + localStorage.ftp * 5
    n1 = information[s + 1]
    n2 = information[s + 2]
    n3 = information[s + 3]
    n4 = information[s + 4]

    connectionProperties = {
        user: n1,

        password: n2,

        port: n3,

        host: n4
    };
    ViewCatalog("/")

})


var r = require('electron').remote
var type_s = r.getGlobal('aname').yourmsg
console.log(type_s)
setInterval(() => {
    if (type_s != r.getGlobal('aname').yourmsg) {
        ViewCatalog(path_1[path_1.length - 1])
        type_s = r.getGlobal('aname').yourmsg
    }
}, 50)

var time_plus
//传入一个路径，返回该路径的子目录
function ViewCatalog(path) {
    path_k.value = path
    var c = new Client();
    c.connect(connectionProperties);
    console.log(path)
    var type = []
    var name = []
    var size = []
    var time = []
    var list_l


    c.on('ready', function () {
        c.list(path, function (err, list) {
            if (err) throwerr;
            console.log(list)

            list = list.slice(2)
            list_l = list.length
            list.forEach(element => {
                size.push(element.size)
                time.push(element.date)
                name.push(iconv.decode(element['name'], 'utf-8'))
                if (element['type'] == '-') {
                    type.push("0")
                } else {
                    type.push("1")
                }

            });
            c.destroy()
        });
    });
    const schedule = require('node-schedule');

    let rule = new schedule.RecurrenceRule();
    rule.second = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]

    let job = schedule.scheduleJob(rule, () => {
        if (name.length != 0 || list_l == 0) {
            job.cancel()
            path_list = name.concat(type)

            create_j(name.concat(type), size, time, (res) => {
                main0.innerHTML = res
                tap1()
                tap_2()
                create_s(name.concat(type), (a, list, i, b) => {
                    a.ondblclick = function () {
                        if (list[list.length / 2 + i] == 1) {

                            path_1[path_1.length] = path_1[path_1.length - 1] + list[i] + "/"
                            ViewCatalog(path_1[path_1.length - 1])

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
                dd_time = true
            })


        }
    })
}


function rename(old, new_) {
    var c = new Client();
    c.connect(connectionProperties);
    c.on('ready', function () {
        c.rename(old, new_)
        c.end()
    });
}




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
            if (err) { console.log(err)
                c.delete(path, (e) => { })
             }
            c.end()
        })
        
    })

}

//创建文件夹
var wjj = "新建文件夹"
var gg = 1

function createfolder(path) {
    var c = new Client();
    c.connect(connectionProperties);
    var dst1 = path_1[path_1.length - 1] + wjj
    console.log("c" + dst1)
    c.mkdir(dst1, function (err) {

        if (err) {
            wjj = "新建文件夹" + gg
            gg++
            // console.log(gg)
            createfolder(path_1[path_1.length - 1])
        }
    });
}









