var fs = require('fs')
var buf = new Buffer.alloc(10240);
var information = []; ////存储账号信息的数组
var identifier; //账号编号

//创建账号并存入txt文件中
function new_(){
    //服务器地址
    let account = document.querySelector('#account').value
    var path=require("path")
    fs.open(yhsj2+'/information/smb.txt', 'r+', function(err, fd) {
        if (err) {
            return console.error(err);
        }
        //读取信息
        fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
            if (err){  
                console.log(err);
            }
            //获取ftp服务器的账号信息，2个为一个账号的信息
            information = buf.slice(0, bytes).toString().split(/\s+/);
            console.log(information)
            for(i=1;i<information.length;i+=2){
                if(account == "" ){
                    alert("创建账号信息未填写完整");
                    break;
                }else if(account==information[i]){
                    //若用户创建的账号已存在于文本中，则弹出窗口提示
                    alert("该账号已存在");
                }else if(i==(information.length-1)){     //账号不存在
                    //设置新建账号的编号
                    identifier = (information.length/2);
                    //将创建账号的各个信息存入txt文件中
                    fs.appendFile(yhsj2+'/information/smb.txt','\r'+identifier+' '+account, function(err){
                        if(err)throw err;
                        console.log(account)
                        //创建账号成功后延时关闭窗口
                        setTimeout(function(){
                            var child = require('electron').remote.getCurrentWindow();
                            child.close();
                        },200)
                    })
                }
            }
        });
    });
}