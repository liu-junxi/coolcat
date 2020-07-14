/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Yang Han
 * @Date: 2020-06-03 11:41:43
 * @LastEditors: Yang Han
 * @LastEditTime: 2020-06-23 08:52:25
 */
let data2 = [];

var fs = require('fs')
var buf = new Buffer.alloc(10240);
var manaulTxt = []; ////存储账号信息的数组
var path = require("path");

setTimeout(function () {
    fs.open(yhsj + '/information/manaulTiming.txt', 'r+', function (err, fd) {
        if (err) {
            return console.error(err);
        }
        //读取信息
        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) {
                console.log(err);
            }
            manaulTxt = buf.slice(0, bytes).toString().split(/\s+/);
            for (let l = 6; l <= manaulTxt.length - 6; l += 6) {
                data2.push({
                    Path: manaulTxt[l],
                    Address: manaulTxt[l + 2],
                    Timing: manaulTxt[l + 3] + manaulTxt[l + 4] + manaulTxt[l + 5] + "/次"
                })
            }
        });
    });
}, 50)

var txtWrite = "";
//函数：删除
function deleteManaul(timingNum, num) {
    fs.open(yhsj + '/information/manaulTiming.txt', 'r+', function (err, fd) {
        if (err) {
            return console.error(err);
        }
        //读取信息
        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) {
                console.log(err);
            }
            //获取ftp服务器的账号信息，num个为一个账号的信息
            information = buf.slice(0, bytes).toString().split(/\s+/);
            let judgeNum = 5;
            //删除最后一个的重新写入
            if (timingNum == information.length / num - 2) {
                for (let txtNum = 0; txtNum < information.length; txtNum++) {
                    if (txtNum == information.length - num - 1) {
                        console.log(information.length - 1)
                        txtWrite = txtWrite + information[txtNum]
                    }
                    else if (txtNum == judgeNum) {
                        //一个账号信息换一次行
                        txtWrite = txtWrite + information[txtNum] + "\n";
                        judgeNum = judgeNum + num;
                    } else if (txtNum == (timingNum + 1) * num) {
                        //跳过删除的账号
                        txtNum = (timingNum + 2) * num - 1
                        switch (txtNum) {
                            case num * 2 - 1:
                                judgeNum = judgeNum + num
                        }
                    } else {
                        //每个账号的不同信息隔空插入
                        txtWrite = txtWrite + information[txtNum] + " ";
                    }
                }
            } else {
                //删除非最后一个的重新写入
                for (let txtNum = 0; txtNum < information.length; txtNum++) {

                    console.log((timingNum + 1) * num)
                    if (txtNum == information.length - 1) {
                        console.log(information.length - 1)
                        txtWrite = txtWrite + information[txtNum]
                    } else if (txtNum == judgeNum) {
                        //一个账号信息换一次行
                        txtWrite = txtWrite + information[txtNum] + "\n";
                        judgeNum = judgeNum + num;
                    } else if (txtNum == (timingNum + 1) * num) {
                        //跳过删除的账号
                        txtNum = (timingNum + 2) * num - 1
                        switch (txtNum) {
                            case num * 2 - 1:
                                judgeNum = judgeNum + num
                                break;
                            case num * 3 - 1:
                                judgeNum = judgeNum + num
                        }
                    } else {
                        //每个账号的不同信息隔空插入
                        txtWrite = txtWrite + information[txtNum] + " ";
                    }
                }
            }
            console.log(txtWrite)
            fs.writeFile(yhsj + '/information/manaulTiming.txt', txtWrite, function (err) {
                if (err) {
                    return console.error(err);
                }
            });
        });
    });
}

let tbody2 = document.querySelector('#tbody2');
setTimeout(function () {
    function render(data2, tbody2) {
        let str = '';
        for (let key in data2) {
            str += `<tr>
            <td style="text-align:center;word-break:break-all">${data2[key].Path}</td>
            <td style="text-align:center">${data2[key].Address}</td>
            
            <td style="text-align:center"><a class="remove2"  href="javascript:;" data-id="${key}">删除</a></td>
            </tr>`;
            // console.log(`table2:  id: ${item.id},name: ${item.name},age: ${item.age}`);
        }
        tbody2.innerHTML = str;
        let remove2 = document.querySelectorAll('.remove2');
        for (let key in remove2) {
            remove2[key].onclick = () => {
                txtWrite = "";
                console.log(parseInt(remove2[key].getAttribute("data-id")))
                deleteManaul(parseInt(remove2[key].getAttribute("data-id")), 6)
                remove2[key].parentNode.parentNode.innerHTML = '';

            }
        }

    }
    render(data2, tbody2);
}, 200)




//选择文件夹
document.getElementById("c_wjj2").onclick = () => {
    localStorage.up_type1 = "bf_2"
    localStorage.up_type = 1
    window.location.href = "./up_.html"
}


if (localStorage.bf_2 == "true") {
    
    document.getElementById("wjj2").innerHTML = localStorage.bdy_path
    console.log(localStorage.bdy_path)
    console.log(localStorage.bdy_name)
}


//选择备份到
document.getElementById("c_xn").onclick = () => {
    localStorage.up_type1 = "c_xn"
    window.location.href = "./up_2.html"
}

if (localStorage.c_xn == "true") {
    
    // document.getElementById("wjj2").innerHTML=localStorage.bdy_path
    document.getElementById("xn").innerHTML = localStorage.bdy

}


//日志

window.onload = () => {

    document.getElementById("t").onclick = () => {

        document.getElementById("d_table").style.display = "none"
    }

    document.getElementById("tt").onclick = () => {

        document.getElementById("d_table").style.display = ""
    }

    var jo = document.getElementById("table_jo")
    var str = "<tr>"
    read_txt(yhsj + "/information/jo.txt", (e) => {
        console.log(e)
        if (e.length > 4) {
            for (let n = 0; n < e.length / 5; n++) {
                for (let m = 0; m < 5; m++) {
                    str += "<td>&emsp;" + e[m] + "</td>"
                }
                jo.innerHTML += str + "</tr>"
                str = "<tr>"
            }
        }
    })
}


//删除日志
document.getElementById("d_table").onclick = () => {
    fs.writeFile(yhsj + "/information/jo.txt", "", function (err) {
        if (err) {
            return console.error(err);
        }
        location.reload()
    });
}