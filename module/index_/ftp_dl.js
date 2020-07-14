//打开创建账号的窗口
function newftp(){
    var {BrowserWindow} = require('electron').remote
    //获取当前窗口
    var parent = require('electron').remote.getCurrentWindow();
    //创建子窗口（模态窗口）
    var child = new BrowserWindow({parent: parent, modal: true, width:600, height:600,webPreferences:{nodeIntegration:true}});
    child.loadFile('./html/new/new.html');
    child.on('closed',()=>{
        window.location.href="./index.html"
        child = null;
    })
}



var {remote} = require('electron')
var ftpNum;
var txtWrite = ""; //存储删除后的账号信息
var fs = require('fs')
var buf = new Buffer.alloc(1024);
var information = []; //存储账号信息的数组


//electron创建右键菜单
var rightTemplate = [
    {label:'删除',
    click:()=>{
        deleteFtp(ftpNum,5);
    }},
    {label:'重命名',
    click:()=>{
        console.log('重命名被点击了')
        renameFtp(ftpNum,5);
    }},
]


var ftp = remote.Menu.buildFromTemplate(rightTemplate)

c_yp('ftp',5,yhsj+'/information/information.txt',(n,i)=>{
    
    n.onmouseover = function(){
        n.style.background = "#DAF5FF"
    }
    n.onmouseout = function (){
        n.style.background = ""
    }
    n.onclick = function () {
        localStorage.ftp = i
        window.location.href = "./ftp.html"  
    }
    n.oncontextmenu = function (e){
        e.preventDefault()
        ftp.popup({window:remote.getCurrentWindow()})
        console.log(this.id)
        ftpNum = i;
        txtWrite = "";
    }
    
    document.getElementById("ftp_1").onmousemove=function(){
        document.getElementById("ftp_1").style.background = "#DAF5FF"
    }
    document.getElementById("ftp_1").onmouseout=function(){
        document.getElementById("ftp_1").style.background = ""
    }
})

setTimeout(()=>{
    document.getElementById("ftp_1").onclick=function(){
        newftp()
    }
},200)

//函数：删除
function deleteFtp(ftpNum,num){
    console.log(ftpNum*num+5)
    fs.open(yhsj+'/information/information.txt', 'r+', function(err, fd) {
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
            let judgeNum = 4;
            //删除最后一个的重新写入
            if(ftpNum == information.length/num-2){
                for (let txtNum=0; txtNum<information.length; txtNum++){  
                    if(txtNum == information.length-num-1){
                        console.log(information.length-1)
                        txtWrite = txtWrite + information[txtNum]
                    }
                    else if(txtNum == judgeNum){
                        //一个账号信息换一次行
                        txtWrite = txtWrite + information[txtNum] + "\n";
                        judgeNum = judgeNum + num;
                    }else if (txtNum == (ftpNum+1)*num){
                        //跳过删除的账号
                        txtNum = (ftpNum+2)*num-1
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
                        console.log(information.length-1)
                        txtWrite = txtWrite + information[txtNum]
                    }else if(txtNum == judgeNum){
                        //一个账号信息换一次行
                        txtWrite = txtWrite + information[txtNum] + "\n";
                        judgeNum = judgeNum + num;
                    }else if (txtNum == (ftpNum+1)*num){
                        //跳过删除的账号
                        txtNum = (ftpNum+2)*num-1
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
            fs.writeFile(yhsj+'/information/information.txt', txtWrite,  function(err) {
                if (err) {
                    return console.error(err);
                }
            });
        });
    });
    window.location.href = "./index.html"
}


//const prompt = require('electron-prompt');
//函数：重命名
function renameFtp(ftpNum,num){
    prompt({
        title: '重命名',
        label: '输入新的命名',
        type: 'input'
    })
    .then((ftpRename) => {
        if (ftpRename === null) {
            console.log('user cancelled');
        } else {
            fs.open(yhsj+'/information/information.txt', 'r+', function(err, fd) {
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
                        if(ftpRename == information[q]){
                            bool = 0;
                            break;
                        }else{
                            bool = 1;
                        }
                    }
                    if (bool == 1) {
                        let judgeNum = 4;
                        for (let txtNum=0; txtNum<information.length; txtNum++){ 
                            if(txtNum == information.length-1){
                                console.log(information.length-1)
                                txtWrite = txtWrite + information[txtNum]
                            }else if(txtNum == judgeNum){
                                //一个账号信息换一次行
                                txtWrite = txtWrite + information[txtNum] + "\n";
                                judgeNum = judgeNum + num;
                            }else if (txtNum == (ftpNum+1)*num){
                                information[txtNum] = ftpRename;
                                txtWrite = txtWrite + information[txtNum] + " ";
                            }else{
                                //每个账号的不同信息隔空插入
                                txtWrite = txtWrite + information[txtNum] + " ";
                            }
                        }
                        fs.writeFile(yhsj+'/information/information.txt', txtWrite,  function(err) {
                            if (err) {
                                return console.error(err);
                            }
                        }); 
                        alert("重命名成功")
                        /* setTimeout(() => {
                            x(path_1[path_1.length - 1], access_token, cookie)
                        }, 2500) */
                        window.location.href = "./index.html";   
                    }else {
                        alert("该名字已被占用")
                    }
            });
        });}
    })
    .catch(console.error);
}