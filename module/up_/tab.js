// 导航栏顶部菜单
var top_back = document.getElementById("top_back")
var top_go = document.getElementById("top_go")
var top_retreat = document.getElementById("top_retreat")
//path_3保存历史路径
var path_3 = []
top_back.onclick = function () {
    if (path_1.length >= 2) {
        path_2 = Judge_Path(path_1[path_1.length - 2])
        setTimeout(x, time);
        path_1.splice(path_1.length - 1, 1)
    }
}



top_retreat.onclick = function () {
    if (path_1.length >= 2) {
        path_2 = Judge_Path(path_1[path_1.length - 2])
        setTimeout(x, time);
        path_3.push(path_1[path_1.length - 1])
        path_1.splice(path_1.length - 1, 1)
    }

    top_go.onclick = function () {
        var m = path_3.length
        if (m > 0) {
            path_2 = Judge_Path(path_3[0])
            path_1.push(path_3[0])
            path_3.splice(0, 1)
            setTimeout(x, 400);
        }
    }
}


//左侧菜单
var tap_left = this.document.querySelector("#tab_left");

var tap_left_lis = tap_left.querySelectorAll("li");
for (let j = 0; j < tap_left_lis.length; j++) {
    // console.log("haha")
    tap_left_lis[j].index = j
    tap_left_lis[j].onclick = function () {
        switch (this.index) {
            case 0:
                x1("/home/" + useid + "/")
                break;
            case 1:
                x1("/home/" + useid + "/" + "桌面" + "/")
                break;
            case 2:
                x1("/home/" + useid + "/" + "视频" + "/")
                break;
            case 3:
                x1("/home/" + useid + "/" + "图片" + "/")
                break;
            case 4:
                x1("/home/" + useid + "/" + "文档" + "/")
                break;
            case 5:
                x1("/home/" + useid + "/" + "下载" + "/")
                break;
            case 6:
                x1("/home/" + useid + "/" + "音乐" + "/")
                break;
            case 7:
                x1("/")

                break;
        }

    }

}



var r = require('electron').remote
var type_s = r.getGlobal('aname').yourmsg
setInterval(() => {
    if (type_s != r.getGlobal('aname').yourmsg) {
        path_2 = Judge_Path(path_1[path_1.length - 1])
        setTimeout(x, time);
        type_s = r.getGlobal('aname').yourmsg
    }
}, 50)


