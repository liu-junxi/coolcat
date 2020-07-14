

//下载路径
var exec = require('child_process').execSync
//useid是用户名
var whoami = exec('whoami').toString()
var useid = whoami.slice(whoami.indexOf('\\') + 1, whoami.length - 1)

var dow_path="/home/" + useid + "/" + "下载" + "/"
// var dow_path = "e:/下载/"

//用户数据
var path = require("path")

var yhsj= "/home/"+useid+"/.config/coolcat"
var yhsj2= "/home/"+useid+"/.config/coolcat"

//导航栏的文本框
const path_k = document.getElementById("path_k");




// 生成文件夹和文件的HTML
// 传入一个list数组，数组的前半部分保存文件及文件夹的名字，通过数组的后半部分区分文件夹与文件，0代表文件，1代表文件夹
function create_j(list,size,time,callback) {
    var img
    var div
    var ppp
    var pp
    var res = null
    var buf = new Buffer.alloc(1024);
    fs.open(yhsj + "/information/swicth/type.txt", 'r+', function (err, fd) {
        if (err) { console.log(err) }
        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) { console.log(err) }
            if (bytes > 0) {
                switch (buf.slice(0, bytes).toString()) {
                    case "big":
                        img = 1
                        div = 1
                        ppp = 1
                        pp = 10
                        break

                    case "middle":
                        img = 0
                        div = 0
                        ppp = 0
                        pp = 10
                        break

                    case "small":
                        img = ""
                        div = ""
                        ppp = ""
                        pp = 10
                        break

                    case "列表":
                        img = 2
                        div = 2
                        ppp = 3
                        pp = 10
                        break

                    case "详细列表":
                        img = 2
                        div = 2
                        ppp = 4
                        pp = 3
                        break

                }

            }
            fs.close(fd, function (err) {
                if (err) {
                    console.log(err);

                }
                
                var nr = []
    nr[0] = "<div class='div_file" + div + "' id='file_div"
    nr[1] = "</div>"
    //文件夹
    nr[2] = "<svg class=\"bi bi-folder img" + img + "\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "  <path fill-rule=\"evenodd\" d=\"M9.828 3h3.982a2 2 0 011.992 2.181l-.637 7A2 2 0 0113.174 14H2.826a2 2 0 01-1.991-1.819l-.637-7a1.99 1.99 0 01.342-1.31L.5 3a2 2 0 012-2h3.672a2 2 0 011.414.586l.828.828A2 2 0 009.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 006.172 2H2.5a1 1 0 00-1 .981l.006.139z\" clip-rule=\"evenodd\"/>\n" +
        "</svg>"
    //名字
    nr[3] = "<p class='ppp" + ppp + "' id='file_div_p"

    
    nr[6] = "'>"
    //其他文件
    nr[7] = "<svg class=\"bi bi-file-post img" + img + "\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "  <path fill-rule=\"evenodd\" d=\"M4 1h8a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3a2 2 0 012-2zm0 1a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V3a1 1 0 00-1-1H4z\" clip-rule=\"evenodd\"/>\n" +
        "  <path d=\"M4 5.5a.5.5 0 01.5-.5h7a.5.5 0 01.5.5v7a.5.5 0 01-.5.5h-7a.5.5 0 01-.5-.5v-7z\"/>\n" +
        "  <path fill-rule=\"evenodd\" d=\"M4 3.5a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5a.5.5 0 01-.5-.5z\" clip-rule=\"evenodd\"/>\n" +
        "</svg>"
    //图片文件 bmp JPG GIF PNG JPEG TIF  psd raw
    nr[71] = "<svg class=\"bi bi-image img" + img + "\"   viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "  <path fill-rule=\"evenodd\" d=\"M14.002 2h-12a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zm-12-1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12z\"/>\n" +
        "  <path d=\"M10.648 7.646a.5.5 0 0 1 .577-.093L15.002 9.5V14h-14v-2l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71z\"/>\n" +
        "  <path fill-rule=\"evenodd\" d=\"M4.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z\"/></svg>"
    //视频文件 MP4 3PG AVI  rmvb  flv swf  mov wmv
    nr[72] = "<svg class=\"bi bi-film img" + img + "\"  viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        " <path fill-rule=\"evenodd\" d=\"M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0h8v6H4V1zm8 8H4v6h8V9zM1 1h2v2H1V1zm2 3H1v2h2V4zM1 7h2v2H1V7zm2 3H1v2h2v-2zm-2 3h2v2H1v-2zM15 1h-2v2h2V1zm-2 3h2v2h-2V4zm2 3h-2v2h2V7zm-2 3h2v2h-2v-2zm2 3h-2v2h2v-2z\"/></svg>"
    //音乐文件  mp3 WMA 
    nr[73] = "<svg class=\"bi bi-music-note-beamed img" + img + "\"  viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "  <path d=\"M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z\"/>\n" +
        "  <path fill-rule=\"evenodd\" d=\"M14 11V2h1v9h-1zM6 3v10H5V3h1z\"/>\n" +
        "  <path d=\"M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z\"/></svg>"
    //文本文件 TXT log bin mht chm
    nr[74] = "<svg class=\"bi bi-file-text img" + img + "\"  viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "  <path fill-rule=\"evenodd\" d=\"M4 1h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H4z\"/>\n" +
        "  <path fill-rule=\"evenodd\" d=\"M4.5 10.5A.5.5 0 0 1 5 10h3a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 8h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zm0-2A.5.5 0 0 1 5 4h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z\"/></svg>"
    //文档 DOC  docx  ppt  pptx  xsl  xslx
    nr[75] = "<svg class=\"bi bi-file-earmark img" + img + "\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "  <path d=\"M4 1h5v1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6h1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z\"/>\n" +
        "  <path d=\"M9 4.5V1l5 5h-3.5A1.5 1.5 0 0 1 9 4.5z\"/></svg>"
    //压缩文件 zip rar 7z
    nr[76] = "<svg class=\"bi bi-file-earmark-zip img" + img + "\"  viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "  <path d=\"M4 1h5v1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6h1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z\"/>\n" +
        "  <path d=\"M9 4.5V1l5 5h-3.5A1.5 1.5 0 0 1 9 4.5z\"/>\n" +
        "  <path fill-rule=\"evenodd\" d=\"M5 8.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v.938l.4 1.599a1 1 0 0 1-.416 1.074l-.93.62a1 1 0 0 1-1.11 0l-.929-.62a1 1 0 0 1-.415-1.074L5 9.438V8.5zm2 0H6v.938a1 1 0 0 1-.03.243l-.4 1.598.93.62.929-.62-.4-1.598A1 1 0 0 1 7 9.438V8.5z\"/>\n" +
        "  <path d=\"M6 2h1.5v1H6zM5 3h1.5v1H5zm1 1h1.5v1H6zM5 5h1.5v1H5zm1 1h1.5v1H6V6z\"/></svg>"
    //编程语言 html  xml js css java class php py 
    nr[77] = "<svg class=\"bi bi-file-earmark-code img" + img + "\" viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "  <path d=\"M4 1h5v1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6h1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z\"/>\n" +
        "  <path d=\"M9 4.5V1l5 5h-3.5A1.5 1.5 0 0 1 9 4.5z\"/>\n" +
        "  <path fill-rule=\"evenodd\" d=\"M8.646 6.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 9 8.646 7.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 9l1.647-1.646a.5.5 0 0 0 0-.708z\"/></svg>"
    //程序包 exe rpm deb
    nr[78] = "<svg class=\"bi bi-app img" + img + "\"  viewBox=\"0 0 16 16\" fill=\"currentColor\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
        "  <path fill-rule=\"evenodd\" d=\"M11 2H5a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5a3 3 0 0 0-3-3zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5z\"/></svg>"

    var b = list.length / 2

    for (var a = 0; a < b; a++) {
        var kk = 7
        nr[5] = list[a]

        if (list[b + a] == 0) {
            var two = nr[5].slice(nr[5].length - 2)
            var three = nr[5].slice(nr[5].length - 3)
            var four = nr[5].slice(nr[5].length - 4)
            var five = nr[5].slice(nr[5].length - 5)
            var wj_type="文件"
            if (three === "bmp" || three === "jpg" || three === "gif" || three === "png" || three === "jpeg" || three === "tif" || three === "psd" || three === "raw") {
                kk = 71
                wj_type="图片文件"
            } else if (three === "mp4" || three === "3pg" || three === "avi" || three === "flv" || three === "swf" || three === "mov" || three === "wmv" || four === "rmvb") {
                kk = 72
                wj_type="视频文件"
            } else if (three === "mp3" || three === "wma" || three === "ncm") {
                kk = 73
                wj_type="音频文件"
            } else if (three === "txt" || three === "log" || three === "bin" || three === "mht" || three === "chm") {
                kk = 74
                wj_type="文本文件"
            } else if (three === "doc" || three === "docx" || three === "ppt" || four === "pptx" || three === "xsl" || four === "xslx" || three === "one") {
                kk = 75
                wj_type="文档文件"
            } else if (three === "zip" || three === "rar" || three === "7z") {
                kk = 76
                wj_type="压缩文件"
            } else if (four === "html" || three === "tml" || three === "xml" || two === "js" || three === "css" || four === "java" || three === "php" || two === "py" || five === "class") {
                kk = 77
                wj_type="编程文件"
            } else if (three === "exe" || three === "rpm" || three === "deb") {
                kk = 78
                wj_type="文件"
            }
            var t=""
            if(time[a]!=undefined){
                t=dateFormat("YYYY-mm-dd HH:MM", new Date(time[a]))
            }
            var s=""
            if(size[a]!=undefined){
                s=(Number(size[a])/1024).toFixed(2)+" kb"
            }
            nr[4] = "<p style='left:250px' class='ppp" + pp + "'>"+wj_type+"</p><p style='left:380px;width:300px' class='ppp" + pp + "'>"+s+"</p><p style='left:520px;width:300px' class='ppp" + pp + "'>"+  t+"</p></p>"
            nr[99] = nr[0] + a + nr[6] + nr[kk] + nr[3] + a + nr[6] + nr[5] + nr[4] + nr[1]
        } else {
            nr[4] = "<p style='left:250px' class='ppp" + pp + "'>文件夹</p></p>"
            nr[99] = nr[0] + a + nr[6] + nr[2] + nr[3] + a + nr[6] + nr[5] + nr[4] + nr[1]
        }
        if (res === null) {
            res = nr[99]
        } else {
            res += nr[99]
        }

    }
    callback(res)
            });
        });
    });

    
}


//格式化时间
function dateFormat(fmt, date) {
    
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        };
    };
    return fmt;
}

// 为create_j生成的每一个div块绑定一个事件
function create_s(list, callback) {
    var a = new Array()
    var b = new Array()
    for (let i = 0; i < list.length / 2; i++) {
        a[i] = document.getElementById("file_div" + i)
        b[i] = document.getElementById("file_div_p" + i)

        callback(a[i], list, i, b[i])

    }

}


//读取并生成已存在
function c_yp(id, x, path, callback, plus) {
    var fs = require('fs')
    var img = document.getElementById(id);
    var buf = Buffer.alloc(50240);
    var information = []; ////存储账号信息的数组
    var yp_name = []

    fs.open(path, 'rs+', function (err, fd) {
        if (err) {
            return console.error(err);
        }

        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) {
                console.log(err);
            }
            //获取账号信息，x个为一个账号的信息
            information = buf.slice(0, bytes).toString().split(/\s+/);
            // console.log(information)
            var n = 0
            for (var i = x + 1; i < information.length; i += x) {
                if (information.length == 1) {
                    //txt文件没有账号信息的时候，information.length 是1
                    //当txt文件中没有账号信息的时候，不作为
                } else {
                    //创建每个账号的div块
                    var div = document.createElement('div');
                    //设置div块的class
                    div.className = "div_file"
                    div.id = "div_" + id + n
                    div.style.padding = "10px 10px 0 10px"
                    //在div块内创建img标签还有span标签
                    yp_name.push(information[i - 1])
                    var html = '<img src="../img/' + id + '.jpg" style="width: 70px; height: 70px;margin-bottom:7px;"><p style="text-align: center;width: 70px;word-break: break-all;">' + information[i - 1] + '</p>'//设置显示的数据，可以是标签
                    div.innerHTML = html
                    //生成标签
                    img.appendChild(div);
                    n++
                }
            }
            if (!plus) {
                //创建新建div块
                var div = document.createElement('div');
                //设置div块的class
                div.className = "div_file"
                div.id = id + "_1"
                div.style.padding = "10px 10px 0 10px"
                //在div块内创建img标签还有span标签
                var html = '<img src="../img/plus.png" style="width: 70px; height: 70px;margin-bottom:7px;"><p style="text-align: center;width: 70px;word-break: break-all;">新建+</p>'//设置显示的数据，可以是标签．
                div.innerHTML = html
                //生成标签
                img.appendChild(div);
            }
        });
    });
    //绑定事件
    setTimeout(() => {

        for (let i = 0; i < information.length / x - 1; i++) {
            // console.log(i)

            var n = document.getElementById("div_" + id + i)
            callback(n, i, yp_name[i])

        }
    }, 500)
}




//打开创建账号的窗口
function new_jdt() {
    var { BrowserWindow } = require('electron').remote
    //获取当前窗口
    var parent = require('electron').remote.getCurrentWindow();
    //创建子窗口（模态窗口）
    var child = new BrowserWindow({ parent: parent, modal: true, width: 400, height: 250, webPreferences: { nodeIntegration: true } });
    child.loadFile('./html/jdt.html');
    child.on('closed', () => {
        // window.location.href="./index.html"
        child = null;
    })
}