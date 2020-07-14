// document.body.onselectstart = document.body.oncontextmenu = function () { return false; }

const main0 = document.getElementById("main0");

// path_1是保存路径的数组
var path_1 = []
path_1[0] = "/"
// path_list保存当前目录下的所有子目录的名字
var path_list = []

//连接参数
var n1, n2, n3

const { createClient } = require("webdav");
var fs = require('fs')

read_txt(yhsj+'/information/webdav.txt', (information) => {
    var s = 4 + localStorage.webdav * 4
    n1 = information[s + 1]
    n2 = information[s + 2]
    n3 = information[s + 3]
    client = createClient(
        n3,
        {
            username: n1,
            password: n2
        }
    );
    client.createDirectory("/酷猫云盘管理器");
    x("/")
})



var time_plus 
//刷新页面
function x(path) {
    path_k.value = path
    // var a=new GetDirectoryContentsOptions()
    client.getDirectoryContents(path,{ deep: true }).then((contents) => {
        console.log(contents)
        var name = []
        var type = []
        var size = []
        var time = []
        var z_time = []
        contents.forEach(e => {
            name.push(e.basename)
            time.push(e.lastmod)
            size.push(e.size)
            if(e.type == 'file'){
                type.push("0")
            } else {
                type.push("1")
            }
            z_time.push(e.lastmod)
        })
        path_list=name.concat(type)
        create_j(name.concat(type),size,time,(res)=>{
            main0.innerHTML = res

            tap1()
        tap_2()
        create_s(name.concat(type), (a, list, i,b) => {
            a.ondblclick = function () {
                if (list[list.length / 2 + i] == 1) {

                    path_1[path_1.length] = path_1[path_1.length - 1] + list[i] + "/"
                    x(path_1[path_1.length - 1])
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
        
    });
}
