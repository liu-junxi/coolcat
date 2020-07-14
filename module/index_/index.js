document.getElementById("jsj").onclick = function () {
    window.location.href = "./1.html"
}
document.getElementById("left_word").onclick = function () {
    console.log(1)
    localStorage.index_t = "word"
    window.location.href = "./1.html"
}
document.getElementById("left_dow").onclick = function () {
    console.log(2)
    localStorage.index_t = "dow"
    window.location.href = "./1.html"
}
// console.log(localStorage.bdy_)
localStorage.bdy_ = "false"
localStorage.bf_1 = "false"
localStorage.bf_2 = "false"
localStorage.c_xn = "false"
localStorage.webdav_ = "false"
localStorage.smb_ = "false"
localStorage.ftp_ = "false"
localStorage.qiniu_ = "false"

//用户数据路径
var exec = require('child_process').execSync
//useid是用户名
var whoami = exec('whoami').toString()
var useid = whoami.slice(whoami.indexOf('\\') + 1, whoami.length - 1)
var yhsj= "/home/"+useid+"/.config/coolcat"

var fs = require("fs");



fs.writeFile(yhsj + "/information/swicth/1.txt", '1', function (err) {
    
});