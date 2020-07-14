var exec = require('child_process').execSync
//useid是用户名
var whoami = exec('whoami').toString()
//用户数据路径
var useid = whoami.slice(whoami.indexOf('\\') + 1, whoami.length - 1)
var yhsj= "/home/"+useid+"/.config/coolcat"


//新文件上传 path:要上传文件的本地路径 name：文件夹名字 file_size:要上传文件的大小 p:在云端目录/apps/酷猫云盘管理器2020/下的绝对路径
function sc(path, name, file_size, p, callback) {
    fp_file_md5(path, name, (md5, h_zhui, path_top, n) => {

        const schedule = require('node-schedule');
        let rule = new schedule.RecurrenceRule();
        rule.second = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
        let job = schedule.scheduleJob(rule, () => {
            console.log(md5)
            console.log(n)

            if (md5.length == n) {
                job.cancel()
                file_ysc(access_token, cookie, "/apps/酷猫云盘管理器2020/" + p, file_size, "0", md5,
                    (res) => {
                        // errno: 0  ---0代表请求成功
                        // return_type: 1 ---1代表百度服务器无此文件
                        // block_list: (7)[0, 1, 2, 3, 4, 5, 6] ---分片个数
                        // uploadid: "P1-MTAuMTUxLjM4LjQxOjE1OTAyMzg2MTQ6MzMzNjgxNzc5MDEyNjgxMjg1OQ=="  --上传id
                        console.log(res)
                        if (res.errno == 0) {
                            //  console.log(res.uploadid)
                            var list = res.block_list.length
                            if (list == 0) { list = 1 }

                            var m = 0
                            sc()
                            function sc() {
                                if (m < list) {
                                    //上传分片
                                    file_fp(access_token, cookie,
                                        "/apps/酷猫云盘管理器2020/" + p, res.uploadid, path_top + m + h_zhui, m, (res1) => {
                                            console.log(res1)
                                            // console.log("第" + m + "个分片上传成功")
                                            // console.log(md5[m])
                                            if (localStorage.up_type == 0) {
                                            localStorage.jdt = ((m + 1) / list) * 100
                                            console.log(localStorage.jdt)
                                            
                                            }
                                            m++
                                            sc()
                                        })

                                }
                                //在百度云盘创建文件
                                else {

                                    file_cy(access_token, cookie,
                                        "/apps/酷猫云盘管理器2020/" + p, file_size, "0"
                                        , res.uploadid, md5, (res) => {
                                            console.log(res)
                                            
                                            deleteFolder(path_top, () => {

                                                callback()
                                            })
                                        })


                                }
                            }

                        }
                    })

            }
        })

    })


}



//取所有分片的md5
function fp_file_md5(path, name, callback) {
    var fs = require('fs')
    var chunks
    var pa = require("path")
    var path_top = yhsj + "/" + name + "/"

    var ext_name = pa.extname(path)
    var md5 = []
    fs.mkdir(path_top, function (err) {
        if (err) {
            console.log(err)
        }

        fs.stat(path, (err, file) => {
            if (err) {
                console.log(err)
            }

            var fileSize = file.size; // 文件大小
            var chunkSize = 4 * 1024 * 1024-1; // 切片的大小
            chunks = Math.ceil(fileSize / chunkSize); // 获取切片的个数
            console.log(chunks)

            
            var k = 0
            sj(k)
            // for (let j = 0; j < chunks; j++) {
            function sj(j) {
                
                var start = chunkSize * j
                var end = start + chunkSize > file.size ? file.size : (start + chunkSize)
                // console.log(start)
                // console.log(end)
                var optition = {
                    'flags': 'r', // 默认读取
                    'encoding': null, // 默认null
                    'fd': null, // 取拿一个文件，默认null，createReadStream自己处理得到
                    'mode': 0o666, // 默认值可读可写不可操作
                    'autoClose': true, // 默认 ture，读取完毕后关闭文件
                    'highWaterMark': chunkSize,
                    'start': start,
                    'end': end
                }

                var n = fs.createReadStream(path, optition)
                var crypto = require('crypto');
                var hash=crypto.createHash('md5')
                n.on('data',hash.update.bind(hash))
                n.on('end',function(){
                    // console.log(hash.digest("hex"))
                    var result =hash.digest("hex")
                    md5[j] = result;
                })
                

                var m = fs.createWriteStream(path_top + j + ext_name)
                n.pipe(m)
                if(k < chunks-1){
                k++
                sj(k)
                }else{callback(md5, ext_name, path_top, chunks)}

            }



        })
    })
    

}




//文件上传之预上传
// path	    string		上传后使用的文件绝对路径(路径末尾为具体文件或目录)
// size	    string		文件或目录的大小，单位B
// isdir	string		是否目录，0 文件、1 目录
// autoinit	int		    固定值1
// rtype	int		    文件命名策略，默认0
// 0 为不重命名，返回冲突
// 1 为只要path冲突即重命名
// 2 为path冲突且block_list不同才重命名
// 3 为覆盖
// block_list	json array	文件各分片MD5的json串

function file_ysc(access_token, cookie, path, size, isdir, block_list, callback) {
    var url = "http://pan.baidu.com/rest/2.0/xpan/file?method=precreate&access_token=" + access_token

    block_list = JSON.stringify(block_list)
    var autoinit = 1
    var rtype = 3

    var date = { path, size, isdir, autoinit, rtype, block_list }
    do_bdy("post", url, 'pan.baidu.com', cookie, function (res) {
        callback(res)
    }, date)
}

//file_ysc(access_token,cookie,"/code/1.jpg","1082775","0",["E33E3685C1A7DF1B516278285A74B891"])


//文件上传之分片上传
// method	string		固定值 upload
// type	    string		固定值 tmpfile
// path	    string		上传后使用的文件绝对路径
// uploadid	string		precreate接口下发的uploadid
// file	    char[]		上传的文件内容
// partseq	int	    	文件分片的位置序号，参考precreate接口返回的block_list
function file_fp(access_token, cookie, path, uploadid, file, partseq, callback) {

    var request = require('request')
    var fs = require("fs")


    var url = "https://d.pcs.baidu.com/rest/2.0/pcs/superfile2?access_token=" + access_token + "&method=upload&type=tmpfile&path=" + path + "&uploadid=" + uploadid + "&partseq=" + partseq


    url = encodeURI(url)
    var options = {
        'method': 'POST',
        'url': url,
        'headers': {
            'Host': 'd.pcs.baidu.com',
            'User-Agent': 'pan.baidu.com',
            'Cookie': cookie
        },
        formData: {
            my_file: fs.createReadStream(file)
        }

    };
    request(options, function (err, response) {
        if (err) { console.log(err) }
        callback(JSON.parse(response.body));

    });

    // })

}

// 新建文件、目录
// "https://pan.baidu.com/rest/2.0/xpan/file?method=create&access_token=123"
//  -d 'path=/baidu/test/test.txt&
// isdirsize=33818
// &isdir=0
// &rtype=3
// &uploadid=N1-NjEuMTM1LjE2OS44NDoxNTQ1OTY5MjAzOjgzODQwOTkyMzc2Nzc3MTQwNjc=
// &block_list=["7d57c40c9fdb4e4a32d533bee1a4e409"]'
// path	string	是	上传后使用的文件绝对路径
// size	string	是	文件或目录的大小，必须要和文件真实大小保持一致
// isdir	string	是	是否目录，0 文件、1 目录
function file_cy(access_token, cookie, path, size, isdir, uploadid, block_list, callback) {
    var url = "https://pan.baidu.com/rest/2.0/xpan/file?method=create&access_token=" + access_token 
    block_list = JSON.stringify(block_list)
    var rtype = 1
    var date = { path, size, isdir, uploadid, block_list ,rtype}
    // console.log(date)
    do_bdy("post", url, 'pan.baidu.com', cookie, function (res) {
        callback(res)
    }, date)
}



//d_file("delete", access_token, cookie, "/code/网课通知(1).txt")



//取文件全路径
function get_feles_path(path, callback) {
    // console.log(path)
    var paths = []
    d(path)
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
                    var txt = curPath.replace(localStorage.bdy_path + "/", "");
                    paths.push(txt)

                }
            });
            // fs.rmdirSync(path);
        }
    }
}



//文件信息
function if_file(access_token, cookie, fsids, callback) {
    url = "https://pan.baidu.com/rest/2.0/xpan/multimedia?method=filemetas&access_token=" + access_token + "&fsids=[" + fsids + "]&dlink=1"
    do_bdy("get", url, 'pan.baidu.com', cookie, function (res) {
        callback(res)
    })
}
// if_file(access_token,cookie,"402451248418305")



//文件操作
function d_file(type, access_token, cookie, path, dest) {
    var url = "https://pan.baidu.com/rest/2.0/xpan/file?method=filemanager"
    //文件名重复的处理方式
    ondup = 'newcopy'
    switch (type) {
        case "copy":
            url = url + "&access_token=" + access_token + "&opera=" + type
            var async = 2
            var filelist = [{ 'path': path, 'dest': dest, 'ondup': ondup }]
            filelist = JSON.stringify(filelist)
            break;
        case "move":

            url = url + "&access_token=" + access_token + "&opera=" + type
            var async = 2
            var filelist = [{ 'path': path, 'dest': dest, 'ondup': ondup }]
            filelist = JSON.stringify(filelist)
            break;
        case "rename":

            url = url + "&access_token=" + access_token + "&opera=" + type
            var async = 2
            var newname = dest
            filelist = [{ 'path': path, 'newname': newname }]
            filelist = JSON.stringify(filelist)

            break;
        case "delete":

            url = url + "&access_token=" + access_token + "&opera=" + type
            var async = 1
            var filelist = [path]
            filelist = JSON.stringify(filelist)

            break;
    }
    var date = { async, filelist }
    url = encodeURI(url)
    // console.log(url)
    // console.log(date)
    do_bdy("post", url, 'pan.baidu.com', cookie, function (res) {
        console.log(res)
    }, date)

}
