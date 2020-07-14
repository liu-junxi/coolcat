var SMB2 = require('@marsaud/smb2');

document.body.onselectstart=document.body.oncontextmenu=function(){return false;}

const main0 = document.getElementById("main0");


//连接参数
var op,smb2

// path_1是保存路径的数组
var path_1 = []
path_1[0] = ""
// path_list保存当前目录下的所有子目录的名字
var path_list = []


read_txt(yhsj+'/information/smb.txt', (information) => {
    var s = 2 + localStorage.smb * 2
    n1= information[s+1]
    console.log(n1)
    op={
        share: n1
        , domain: 'WORKGROUP'
        , username: 'administrator'
        , password: ''
        ,packetConcurrency:20
        , autoCloseTimeout: 1000
    }
    smb2 = new SMB2(op);
    // console.log(op)
    ViewCatalog('')
})



var time_plus
//传入一个路径，返回该路径的子目录
function ViewCatalog(path) {
    path_k.value = path
    var smb2 = new SMB2(op);
    console.log(path)
    var type = []
    var name = []
    
    var list_l

    smb2.readdir(path, function (err, files) {
        name=files
        list_l=files.length
        if (err) {
        }
        else{
        files.forEach((d,index)=>{
            smb2.readdir(path_1[path_1.length-1]+ d, function (err) {
                if (err) {
                    type[index]="0"
                    
                }
                else {
                    type[index]="1"
                    
                }
            })
        })
        }
    })

    
    const schedule = require('node-schedule');

let rule = new schedule.RecurrenceRule();
rule.second = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]

let job = schedule.scheduleJob(rule, () => {
    if(name.length!=0||list_l==0){
        job.cancel()
        path_list=name.concat(type)
        create_j(name.concat(type),[],[],(res)=>{
            main0.innerHTML = res
            tap1()
        tap_2()
        create_s(name.concat(type), (a, list, i,b) => {
            a.ondblclick = function () {
                if (list[list.length / 2 + i] == 1) {

                    path_1[path_1.length] = path_1[path_1.length - 1] + list[i] + "\\"
                    ViewCatalog(path_1[path_1.length - 1])
                    
                    a.ondblclick = null;
                }
                
            }
    
            a.onclick = function () {
                var siblings = this.parentNode.querySelectorAll('div');
                var ppp=document.getElementsByClassName("ppp")
                for (let i = 0; i < ppp.length; i++) {
                    ppp[i].scrollTop=0
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
                var l=0
                function plus() {
                    if (l>=100) {
                        l=0
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
        dd_time=true
        })
        
    }
})
    

}


//下载文件
function dow_file(url,filePath,callback){
    var fs=require('fs')
    var smb2 = new SMB2(op);
    smb2.readFile(url, function(err, content) {
        if (err) throw err;
        // console.log(content);
        fs.writeFile(filePath,content,()=>{
            callback()
        })
      });
}


//创建文件夹
var wjj = "新建文件夹"
var gg = 1

function createfolder(path) {
    
    var dst1 = path_1[path_1.length - 1] + wjj
    console.log("c"+dst1)
    smb2.mkdir(dst1, function (err) {
        
        if (err) {
            wjj = "新建文件夹" + gg
            gg++
            // console.log(gg)
            createfolder(path_1[path_1.length - 1])
        }
    });
}










