function read_txt(path, callback) {
    var fs = require('fs')
    var buf = Buffer.alloc(50240);
    var information = []; ////存储账号信息的数组
    fs.open(path, 'r+', function (err, fd) {
        if (err) {
            return console.error(err);
        }
        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) {
                console.log(err);
            }
            //获取账号信息
            information = buf.slice(0, bytes).toString().split(/\s+/);
            callback(information)
        });
    });

}

//取文件全路径
function get_feles_path(path1, callback) {
    //   console.log(path)
    var paths = []
    d(path1)
    setTimeout(() => {
        callback(paths)
    }, 2000)
    function d(path) {
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function (file) {
                var curPath = path + "/" + file;
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    d(curPath);
                } else {
                    // console.log(path)
                    var txt = curPath.replace(path1 + "/", "");
                    paths.push(txt)
                }
            });
            // fs.rmdirSync(path);
        }
    }
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

