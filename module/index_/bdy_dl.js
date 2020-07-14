
var BDUSS, refresh_token, STOKEN,access_token


d_cookie()


var {remote} = require('electron')

var bdyNum = 0;
var txtWrite = ""; //存储删除后的账号信息
var fs = require('fs')
var buf = new Buffer.alloc(1024);
var information = []; //存储账号信息的数组


//electron创建右键菜单
var rightTemplate = [
    {label:'删除',
    click:()=>{
        console.log(bdyNum)
        deleteBdy(bdyNum,3);
    }},
    {label:'重命名',
    click:()=>{
        console.log('重命名被点击了')
        renameBdy(bdyNum,3);
    }},
]


var bdy = remote.Menu.buildFromTemplate(rightTemplate)

c_yp('bdy',3,yhsj+'/information/bdy.txt',(n,i)=>{
    n.onmouseover = function(){
        n.style.background = "#DAF5FF"
    }
    n.onmouseout = function (){
        n.style.background = ""
    }
    n.onclick = function () {
        localStorage.bdy = i
        window.location.href = "./bdy.html"  
    }
    n.oncontextmenu = function (e){
        e.preventDefault()
        bdy.popup({window:remote.getCurrentWindow()})
        console.log()
        bdyNum = i;
        txtWrite = "";
    }
    document.getElementById("bdy_1").onclick=function(){
        new_window()
    }
    document.getElementById("bdy_1").onmousemove=function(){
        document.getElementById("bdy_1").style.background = "#DAF5FF"
    }
    document.getElementById("bdy_1").onmouseout=function(){
        document.getElementById("bdy_1").style.background = ""
    }
})


setTimeout(()=>{
    document.getElementById("bdy_1").onclick=function(){
        new_window()
    }
},200)




//等待用户完成登录
const schedule = require('node-schedule');
let rule = new schedule.RecurrenceRule();
rule.second = [0, 10, 20, 30, 40, 50]
let job = schedule.scheduleJob(rule, () => {
    if (true) {
        get_cookies_url('http://liujunxi.vip/coolcat', function (res) {
            if (res.length == 0) {
                // console.log("等待着")
            }
            else {
                // console.log("登录完成了")
                job.cancel()
                get_cookies(
                    (cookie) => {
                        cookie.forEach(element => {
                            if (element.name === "STOKEN" && element.domain===".pan.baidu.com") {
                                STOKEN = element.value
                                console.log(STOKEN)
                            }
                            else if (element.name === "BDUSS" && element.domain===".baidu.com") {
                                BDUSS = element.value
                                console.log(BDUSS)
                            }
                            else if (element.name === "access_token" && element.domain==="liujunxi.vip") {
                                access_token = element.value
                                console.log(access_token)
                            }
                        });
                    }
                )
                setTimeout(() => {
                    var cookie = 'BDUSS=' + BDUSS + ';STOKEN=' + STOKEN
                    console.log(cookie)
                    // console.log(access_token)
                    read_txt(yhsj+'/information/bdy.txt',(r)=>{
                        identifier=r.length/3
                        var fs=require("fs")
                        fs.appendFile(yhsj+'/information/bdy.txt', '\r' + identifier + ' ' + cookie + ' ' + access_token, function (err) {
                            if (err) {
                                console.log(err)
                                
                            }
                            bdWindow.close()
                        })
                    })
                    
                }, 1500)

                setTimeout(()=>{
                    window.location.href="./index.html"
                },2500)

            }
        })

    }
});

function read_txt(path,callback){
    var fs = require('fs')
    var buf = new Buffer.alloc(50240);
    var information = []; ////存储账号信息的数组
    fs.open(path, 'r+', function (err, fd) {
        if (err) {
            return console.error(err);
        }
        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) {
                console.log(err);
            }
            //获取百度云的账号信息，3个为一个账号的信息
            information = buf.slice(0, bytes).toString().split(/\s+/);
            callback(information)
        });
    });
    
    }


function get_cookies(callback) {
    const { session } = require('electron').remote

// 查询所有 cookies。
session.defaultSession.cookies.get({})
  .then((cookies) => {
    callback(cookies)
  }).catch((error) => {
    console.log(error)
  })
}
function get_cookies_url(urls,callback) {
    const { session } = require('electron').remote
    // 查询所有与设置的 URL 相关的所有 cookies.
    session.defaultSession.cookies.get({ url: urls })
      .then((cookies) => {
        callback(cookies)
      })
  }



function d_cookie() {
    const { session } = require('electron').remote
    //获取cookie
    session.defaultSession.cookies.get({})
        .then((cookies) => {
            // console.log(cookies)
            //删除cookie需要循环remove     
            for (var i = 0; i < cookies.length; i++) {
                //删除cookie
                session.defaultSession.cookies.remove("http://"+cookies[i].domain+cookies[i].path, cookies[i].name, (error) => {
                    //判断是否error
                })
                
            }
        }
        )
}



function new_window() {
    var { BrowserWindow } = require('electron').remote
    //获取当前窗口
    var parent = require('electron').remote.getCurrentWindow();
    //创建子窗口（模态窗口）
    bdWindow = new BrowserWindow({ parent: parent, modal: true, width: 600, height: 600, webPreferences: { nodeIntegration: true } });
    bdWindow.loadURL('http://www.liujunxi.vip/coolcat/bd.php');
    bdWindow.on('closed', () => {
        bdWindow = null;
    })

}




//函数：删除
function deleteBdy(bdyNum,num){
    //console.log(bdyNum)
    fs.open(yhsj+'/information/bdy.txt', 'r+', function(err, fd) {
        if (err) {
            return console.error(err);
        }
        //读取信息
        fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
            if (err){  
                console.log(err);
            }
            //获取ftp服务器的账号信息，num个为一个账号的信息
            information = buf.slice(0, bytes).toString().split(/\s+/);
            let judgeNum = 2;
            //删除最后一个的重新写入
            if(bdyNum == information.length/num-2){
                for (let txtNum=0; txtNum<information.length; txtNum++){  console.log(txtNum);
                    if(txtNum == information.length-num-1){
                        console.log(information.length-1);
                        txtWrite = txtWrite + information[txtNum]
                    }
                    else if(txtNum == judgeNum){
                        //一个账号信息换一次行
                        txtWrite = txtWrite + information[txtNum] + "\n";
                        judgeNum = judgeNum + num;
                    }else if (txtNum == (bdyNum+1)*num){
                        //跳过删除的账号
                        txtNum = (bdyNum+2)*num-1
                        switch(txtNum){
                            case num*2-1:
                                judgeNum = judgeNum + num
                        }
                    } else{
                        //每个账号的不同信息隔空插入
                        txtWrite = txtWrite + information[txtNum] + " ";
                    }
                } 
            }else{
                //删除非最后一个的重新写入
                for (let txtNum=0; txtNum<information.length; txtNum++){  
                    if(txtNum == information.length-1){
                        console.log(information.length)
                        txtWrite = txtWrite + information[txtNum]
                    }else if(txtNum == judgeNum){
                        //一个账号信息换一次行
                        txtWrite = txtWrite + information[txtNum] + "\n";
                        judgeNum = judgeNum + num;
                    }else if (txtNum == (bdyNum+1)*num){
                        //跳过删除的账号
                        txtNum = (bdyNum+2)*num-1
                        switch(txtNum){
                            case num*2-1:
                                judgeNum = judgeNum + num
                                break;
                            case num*3-1:
                                judgeNum = judgeNum + num
                        }
                    } else{
                        //每个账号的不同信息隔空插入
                        txtWrite = txtWrite + information[txtNum] + " ";
                    }
                }
            }
            fs.writeFile(yhsj+'/information/bdy.txt', txtWrite,  function(err) {
                if (err) {
                    return console.error(err);
                }
            });
            console.log(txtWrite)
        });
    });
    window.location.href = "./index.html"
}


const prompt = require('electron-prompt');
//函数：重命名
function renameBdy(bdyNum,num){
    prompt({
        title: '重命名',
        label: '输入新的命名',
        type: 'input'
    })
    .then((bdyRename) => {
        if (bdyRename === null) {
            console.log('user cancelled');
        } else {
            fs.open(yhsj+'/information/bdy.txt', 'r+', function(err, fd) {
                if (err) {
                    return console.error(err);
                }
                //读取信息
                fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
                    if (err){  
                        console.log(err);
                    }
                    //获取ftp服务器的账号信息，num个为一个账号的信息
                    var bool;
                    information = buf.slice(0, bytes).toString().split(/\s+/);
                    for(let q=0;q<information.length;q+=num){
                        //判断新输入的id是否存在
                        if(bdyRename == information[q]){
                            bool = 0;
                            break;
                        }else{
                            bool = 1;
                        }
                    }
                    if (bool == 1) {
                        let judgeNum = 2;
                        for (let txtNum=0; txtNum<information.length; txtNum++){ 
                            if(txtNum == information.length-1){
                                console.log(information.length-1)
                                txtWrite = txtWrite + information[txtNum]
                            }else if(txtNum == judgeNum){
                                //一个账号信息换一次行
                                txtWrite = txtWrite + information[txtNum] + "\n";
                                judgeNum = judgeNum + num;
                            }else if (txtNum == (bdyNum+1)*num){
                                information[txtNum] = bdyRename;
                                txtWrite = txtWrite + information[txtNum] + " ";
                            }else{
                                //每个账号的不同信息隔空插入
                                txtWrite = txtWrite + information[txtNum] + " ";
                            }
                        }
                        fs.writeFile(yhsj+'/information/bdy.txt', txtWrite,  function(err) {
                            if (err) {
                                return console.error(err);
                            }
                        }); 
                        alert("重命名成功")
                        window.location.href = "./index.html";   
                    }else {
                        alert("该名字已被占用")
                    }
            });
        });}
    })
    .catch(console.error);
}