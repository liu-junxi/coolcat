
var path = require("path")


var exec = require('child_process').execSync
//useid是用户名
var whoami = exec('whoami').toString()
var useid = whoami.slice(whoami.indexOf('\\') + 1, whoami.length - 1)
var yh = "/home/" + useid + "/.config/coolcat"

var fs = require('fs')
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

//读取文本
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

//拆分数组
split_array = (arr, len) => {
    let arr_length = arr.length;
    let newArr = [];
    for (let i = 0; i < arr_length; i += len) {
        newArr.push(arr.slice(i, i + len));
    }
    return newArr;
}

//取得本地文件大小
function get_s_b(element, callback) {
    var sizes = {}
    m(element)
    function m(element) {
        get_feles_path(element, (e) => {
            e.forEach((i) => {
                fs.stat(element + "/" + i, (err, stats) => {
                    //   console.log(`fs.stats ${path} file success~`);

                    sizes[i] = stats.size
                    // console.log(stats.size)
                });
            })
        })
    }
    setTimeout(() => {
        callback(sizes)
    }, 1000)
}

//百度云部分
function do_bdy(type, path, host, cookie, callback, date) {
    var request = require('request')
    var option_get = {
        url: path,
        method: 'GET',
        headers: {
            Host: host,
            Cookie: cookie
        }
    }
    var option_post = {
        url: path,
        method: 'POST',
        headers: {
            Host: host,
            Cookie: cookie
        },
        form: date
    }
    if (type === "get") {
        option = option_get
    } else if (type === "post") {
        option = option_post
    }
    request(
        option, function (err, response, body) {
            // console.log(body)
            //err 当前接口请求错误信息
            //response 一般使用statusCode来获取接口的http的执行状态
            //body 当前接口response返回的具体数据 返回的是一个jsonString类型的数据 
            if (err) {
                console.log(err)
            }
            if (!err && response.statusCode == 200) {
                var res = JSON.parse(body);
                callback(res)
            } else {
                callback(body)
            }
        }
    )
}


//获取云端文件信息
function if_file(access_token, cookie, fsids, callback) {
    fsids = JSON.stringify(fsids)
    url = "https://pan.baidu.com/rest/2.0/xpan/multimedia?method=filemetas&access_token=" + access_token + "&fsids=" + fsids + "&dlink=1"
    // console.log(url)
    do_bdy("get", url, 'pan.baidu.com', cookie, function (res) {
        callback(res)
    })
}

//递归获取百度云云端文件信息
function x_baiduyun(path, access_token, cookie, callback) {


    var url = "https://pan.baidu.com/rest/2.0/xpan/multimedia?method=listall&access_token=" + access_token + "&path=" + path + "&recursion=1"
    // console.log(path, access_token, cookie)
    url = encodeURI(url)

    do_bdy("get", url, 'pan.baidu.com', cookie, function (date) {

        var name = []
        var stye = []
        var fs_id = []
        if (date.errno != 0) {
            fs_id = "errno"
            // console.log(date)
        } else {
            date.list.forEach(element => {
                fs_id.push(element['fs_id'])
                name.push(element['server_filename'])
                stye.push(element['isdir'])
            });
        }
        callback(name, stye, fs_id)
    })

}
var buf = Buffer.alloc(50240);
function dataExtract(path, id, num, callback) {
    console.log(path)
    var accountInfo = [];
    fs.open(path, 'r+', function (err, fd) {
        if (err) {
            return console.error(err);
        }
        //读取信息
        fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
            if (err) {
                console.log(err);
            }
            information = buf.slice(0, bytes).toString().split(/\s+/);
            for (let q = 0; q < information.length; q += num) {
                if (id == information[q]) {
                    for (let p = q; p <= q + num - 1; p++) {
                        accountInfo.push(information[p])
                    }
                    //console.log(accountInfo)
                }
            }
        })
    })
    setTimeout(() => {
        callback(accountInfo)
    }, 1000)
}



//百度云新文件上传（覆盖） 208——387行 path:要上传文件的本地路径 name：文件夹名字 file_size:要上传文件的大小 p:在云端的绝对路径
function sc_bdy(path, name, file_size, p, callback) {
    fp_file_md5(path, name, (md5, h_zhui, path_top, n) => {
        const schedule = require('node-schedule');
        let rule = new schedule.RecurrenceRule();
        rule.second = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
        let job = schedule.scheduleJob(rule, () => {
            // console.log(md5)
            // console.log(n)
            if (md5.length == n) {
                job.cancel()
                file_ysc(access_token, cookie, p, file_size, "0", md5,
                    (res) => {
                        // errno: 0  ---0代表请求成功
                        // return_type: 1 ---1代表百度服务器无此文件
                        // block_list: (7)[0, 1, 2, 3, 4, 5, 6] ---分片个数
                        // uploadid: "P1-MTAuMTUxLjM4LjQxOjE1OTAyMzg2MTQ6MzMzNjgxNzc5MDEyNjgxMjg1OQ=="  --上传id
                        // console.log(res)
                        if (res.errno == 0) {
                            //  console.log(res.uploadid)
                            var list = res.block_list.length
                            if (list == 0) { list = 1 }
                            var m = 0
                            sc()
                            function sc() {
                                if (m < list) {
                                    //上传分片
                                    file_fp(access_token, cookie, p, res.uploadid, path_top + m + h_zhui, m, (res1) => {
                                        // console.log(res1)
                                        // console.log("第" + m + "个分片上传成功")
                                        // console.log(md5[m])
                                        m++
                                        sc()
                                    })
                                }
                                //在百度云盘创建文件
                                else {
                                    file_cy(access_token, cookie, p, file_size, "0"
                                        , res.uploadid, md5, (res) => {
                                            // console.log(res)

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
    var path_top = pa.resolve(__dirname, '../') + "/bat/bat/" + name + "/"

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
            var chunkSize = 4 * 1024 * 1024 - 1; // 切片的大小
            chunks = Math.ceil(fileSize / chunkSize); // 获取切片的个数
            console.log(chunks)


            var k = 0
            sj(k)
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
                var hash = crypto.createHash('md5')
                n.on('data', hash.update.bind(hash))
                n.on('end', function () {
                    // console.log(hash.digest("hex"))
                    var result = hash.digest("hex")
                    md5[j] = result;
                })


                var m = fs.createWriteStream(path_top + j + ext_name)
                n.pipe(m)
                if (k < chunks - 1) {
                    k++
                    sj(k)
                } else { callback(md5, ext_name, path_top, chunks) }
            }
        })
    })


}


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

function file_fp(access_token, cookie, path, uploadid, file, partseq, callback) {

    var request = require('request')
    var fs = require("fs")
    var url = "https://d.pcs.baidu.com/rest/2.0/pcs/superfile2?access_token=" + access_token
        + "&method=upload&type=tmpfile&path=" + path + "&uploadid=" + uploadid + "&partseq=" + partseq
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
}

function file_cy(access_token, cookie, path, size, isdir, uploadid, block_list, callback) {
    var url = "https://pan.baidu.com/rest/2.0/xpan/file?method=create&access_token=" + access_token
    block_list = JSON.stringify(block_list)
    var rtype = 3
    var date = { path, size, isdir, uploadid, block_list, rtype }
    // console.log(date)
    do_bdy("post", url, 'pan.baidu.com', cookie, function (res) {
        callback(res)
    }, date)
}

// 删除目录
function deleteFolder(path, callback) {
    var files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file) {
            var curPath = path + file;
            fs.unlinkSync(curPath);
        });
        fs.rmdir(path, function () {
            callback()
        });
    }
};


//七牛云上传

//path本地文件路径；name文件名
function sc_qiniu(bucket, accessKey, secretKey, n, path, name, callback) {
    // console.log(bucket + "--" + accessKey + "--" + secretKey + "--" + n)
    var qiniu = require('qiniu')
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    // console.log(mac)
    //自定义凭证有效期（示例2小时，expires单位为秒，为上传凭证的有效时间）
    var options = {
        scope: bucket + ":" + name,
        expires: 7200
    };
    var putPolicy = new qiniu.rs.PutPolicy(options);
    var uploadToken = putPolicy.uploadToken(mac);

    // console.log(uploadToken)
    var config = new qiniu.conf.Config();
    var fs = require('fs')
    switch (n) {
        case "0":
            config.zone = qiniu.zone.Zone_z0;
            break
        case "1":
            config.zone = qiniu.zone.Zone_z1;
            break
        case "2":
            config.zone = qiniu.zone.Zone_z2;
            break
        case "3":
            config.zone = qiniu.zone.Zone_na0;
            break
    }
    // 空间对应的机房
    // config.zone = qiniu.zone.Zone_z2;
    var key = name
    var formUploader = new qiniu.form_up.FormUploader(config);
    var putExtra = new qiniu.form_up.PutExtra();
    var readableStream = fs.createReadStream(path); // 可读的流
    formUploader.putStream(uploadToken, key, readableStream, putExtra, function (respErr,
        respBody, respInfo) {
        if (respErr) {
            throw respErr;
        }
        if (respInfo.statusCode == 200) {
            callback(respBody);
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    });
}

//webdav上传




//获取七牛云文件信息
function x_qiniu(bucket, accessKey, secretKey, n, path, callback) {
    var qiniu = require('qiniu')
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var config = new qiniu.conf.Config();
    //config.useHttpsDomain = true;
    switch (n) {
        case "0":
            config.zone = qiniu.zone.Zone_z0;
            break
        case "1":
            config.zone = qiniu.zone.Zone_z1;
            break
        case "2":
            config.zone = qiniu.zone.Zone_z2;
            break
        case "3":
            config.zone = qiniu.zone.Zone_na0;
            break
    }

    var bucketManager = new qiniu.rs.BucketManager(mac, config);

    var options = {
        limit: 10000,
        prefix: path,
    };
    bucketManager.listPrefix(bucket, options, function (err, respBody, respInfo) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (respInfo.statusCode == 200) {
            var items = respBody.items;
            var size = {}
            if (items.length != 0) {
                items.forEach(function (item) {

                    size[item.key] = item.fsize
                });
            }
            else {
                size = "errno"
            }
            callback(size)

        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    });

}

//获取webdav文件信息
function x_webdav_R(path, client, callback) {
    var size = {}
    x_webdav(path)
    function x_webdav(path) {
        console.log(path)
        client.getDirectoryContents(path, { deep: true }).then((contents) => {
            // console.log(contents)
            contents.forEach(e => {

                if (e.type == 'file') {
                    size[e.filename] = e.size
                } else {
                    x_webdav(e.filename)
                }

            })
        });
    }
    setTimeout(() => {
        callback(size)
    }, 5000);
}

//取得云端文件的大小
//pa本地文件路径；p文件夹名字，bdy_name云盘昵称
function get_s_y(bdy_name, p, pa, callback) {
    // console.log(bdy_name)
    console.log(p)
    // console.log(bdy_name.slice(0,5))
    // console.log(bdy_name.slice(5))
    if (bdy_name.slice(0, 5) === "百度网盘-") {
        bdy_name = bdy_name.slice(5)
        console.log("百度云")
        dataExtract( yh+ '\\information\\bdy.txt', bdy_name, 3, (g) => {
            // console.log(g)
            access_token = g[2]
            cookie = g[1]
            x_baiduyun("/apps/酷猫云盘管理器2020/" + p, access_token, cookie, (name, stye, fs_id) => {
                // console.log(fs_id)
                if (fs_id === "errno") {
                    callback(fs_id)
                } else {
                    if_file(access_token, cookie, fs_id, (res) => {
                        // console.log(res)
                        var size_y = {}
                        res.list.forEach(
                            (e) => {
                                if (e.isdir == "0") {
                                    size_y[e.path] = e.size
                                }
                            }
                        )
                        callback(size_y)
                        // console.log(name)
                    })
                }
            })
        })
    } else if (bdy_name.slice(0, 6) === "七牛云存储-") {
        console.log("七牛")
        bdy_name = bdy_name.slice(6)
        dataExtract(yh + '\\information\\qiniu.txt', bdy_name, 6, (g) => {
            bucket = g[3]
            accessKey = g[1]
            secretKey = g[2]
            n = g[4]
            // console.log(g)
            // bucket, accessKey, secretKey, n
            x_qiniu(bucket, accessKey, secretKey, n, pa, (res) => {
                callback(res)
            })
        })
    } else if (bdy_name.slice(0, 7) === "webdav-") {
        console.log("w")
        bdy_name = bdy_name.slice(7)
        dataExtract(yh + '\\information\\webdav.txt', bdy_name, 4, (g) => {
            console.log(g)
            const { createClient } = require("webdav");

            client = createClient(
                g[3],
                {
                    username: g[1],
                    password: g[2]
                }
            )
            x_webdav_R("/酷猫云盘管理器/" + p, client, (res) => {
                callback(res)
            })
        })
    }

}


//获取需要更新的文件列表
//path文件夹在本地的路径，wjj_name文件夹的名字，yun_name云盘的昵称
function J_Change(path, wjj_name, yun_name, callback) {
    //dif保存发生改变的文件路径
    var dif = []
    var dif2 = []
    get_s_b(path, (n) => {
        // console.log(n)
        get_s_y(yun_name, wjj_name, path, (e) => {
            if (yun_name.slice(0, 5) === "百度网盘-") {
                yun_name = bdy_name.slice(5)
                // console.log(e)
                if (e === "errno") {
                    for (var key in n) {
                        // console.log("无了")
                        dif.push(path + "/" + key)
                        dif2.push("/apps/酷猫云盘管理器2020/" + wjj_name + "/" + key)
                    }
                } else {
                    for (var key in n) {
                        // console.log(key + "--" + e["/apps/酷猫云盘管理器2020/"+wjj_name+"/"+key] +"---" +n[key])
                        if (e["/apps/酷猫云盘管理器2020/" + wjj_name + "/" + key] != n[key]) {
                            dif.push(path + "/" + key)
                            dif2.push("/apps/酷猫云盘管理器2020/" + wjj_name + "/" + key)
                        }
                    }
                }
            }
            else if (yun_name.slice(0, 6) === "七牛云存储-") {
                // console.log(e)
                // console.log(n)
                // console.log(path)
                if (e === "errno") {
                    for (var key in n) {
                        // console.log("无了")
                        dif.push(path + "/" + key)
                        dif2.push(path + "/" + key)
                    }

                } else {
                    for (var key in n) {
                        // console.log(path + "/" + key +"---" +n[key])
                        console.log(e[path + "/" + key] + "---" + n[key])
                        if (e[path + "/" + key] != n[key]) {
                            dif.push(path + "/" + key)
                            dif2.push(path + "/" + key)
                        }
                    }

                }
            }
            else if (yun_name.slice(0, 7) === "webdav-") {
                // console.log(e)
                // console.log(n)
                var j = function () {
                    for (var key in e) {
                        return false
                    }
                    return true
                }
                if (j()) {
                    for (var key in n) {
                        console.log("无了")
                        dif.push(path + "/" + key)
                        dif2.push( key)
                    }

                } else {
                    for (var key in n) {

                        if (e["/酷猫云盘管理器/" + wjj_name + "/" + key] != n[key]) {
                            dif.push(path + "/" + key)
                            dif2.push(key)
                        }

                    }

                }
                // console.log(dif, dif2)
            }
            callback(dif, dif2)
        })

    })
}

//进行一次备份
//path文件夹在本地的路径，wjj_name文件夹的名字，yun_name云盘的昵称
function back(path, wjj_name, yun_name, callback) {
    J_Change(path, wjj_name, yun_name, (e, f) => {
        console.log(e)
        console.log(f)
        var fs = require("fs")
        if (e[0] != undefined) {
            d(0)
        } else {
            start = true
            console.log("本地文件没有发生改变")
        }
        var l = 0//计数器
        function d(i) {
            if (yun_name.slice(0, 5) === "百度网盘-") {
                fs.stat(e[i], (err, stats) => {

                    if (err) { console.log(err) }
                    var size = stats.size.toString()
                    sc_bdy(e[i], wjj_name, size, f[i], () => {
                        // console.log("完成了")
                        if (l < e.length - 1) {
                            // console.log(l+"---"+e.length)
                            l++
                            setTimeout(() => {
                                d(l)
                            }, 2000)
                        } else {
                            l = 0
                            callback()
                        }

                    })
                })

            }
            else if (yun_name.slice(0, 6) === "七牛云存储-") {
                // sc_qiniu(bucket, accessKey, secretKey, n, path, name, callback)
                sc_qiniu(bucket, accessKey, secretKey, n, e[i], e[i], () => {
                    if (l < e.length - 1) {
                        // console.log(l+"---"+e.length)
                        l++
                        setTimeout(() => {
                            d(l)
                        }, 2000)
                    } else {
                        l = 0
                        callback()
                    }
                })

            }
            else if (yun_name.slice(0, 7) === "webdav-") {
                var path = require("path")
                var paths = []
                //在云端创建文件夹
                console.log(f)
                f.forEach(element => {
                    var size = element.split("/").length

                    var s = []
                    var s1 = element
                    for (let v = 0; v < size - 1; v++) {
                        var n = path.dirname(s1)
                        s.push(n)
                        s1 = n
                    }
                    paths.push(s)

                });
                client.createDirectory("/酷猫云盘管理器/" + wjj_name)
                console.log(paths)
                
                setTimeout(() => {
                    d1(0)
                }, 1000)
    
                var l = 0//计数器
                function d1(i) {
                    var e1 = paths[i]
                    e1.reverse()
                    console.log(e1)
                    var k = 0
                    c(e1[0])
                    function c(f) {
                        if (f != undefined) {
                            client.createDirectory("/酷猫云盘管理器/" + wjj_name + "/" + f).then(() => {
                                // console.log("创建成功")
                                if (k < e.length) {
                                    k++
                                    setTimeout(() => {
                                        c(e1[k])
                                    }, 100)
    
                                } else {
                                    k = 0
                                }
                            })
                        }
                    }
                    setTimeout(()=>{
                        client.putFileContents("/酷猫云盘管理器/"+wjj_name+"/"+f[i], fs.readFileSync(e[i]), {
                            onUploadProgress: progress => {
                                if (progress.loaded == progress.total) {
                                    if (l < e.length - 1) {
                                        // console.log(l+"---"+e.length)
                                        l++
                                        setTimeout(() => {
                                            d1(l)
                                        }, 2000)
        
                                    } else {
                                        l = 0
                                        callback()
                                    }
                                }
                            }
                        })
                    },2000)
                    
                    // console.log("/酷猫云盘管理器/"+wjj_name+"/"+f[i] +"---" + e[i] + "---" + i)
                    // console.log("/酷猫云盘管理器/" + localStorage.bdy_name + "/" + e[i])
    
                    
                }

            }


        }
    })
}


//设置一个定时备份任务

function back_time(path, wjj_name, yun_name) {
    console.log("设置了一个任务")
    var schedule = require('node-schedule')
    //rule 支持设置的值有 second、minute、hour、date、dayOfWeek、month、year 等
    var rule = new schedule.RecurrenceRule()
    // 5min 
    rule.minute = [0,5,10,15,20,25,30,35,40,45,50,55]
    // rule.minute =[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59]
    rule.second = 0

    var job = schedule.scheduleJob(rule, () => {
        console.log(new Date())
        var bac = setInterval(() => {
            console.log("尝试执行")
            if (start) {
                start = false
                back(path, wjj_name, yun_name, () => {
                    start = true
                    console.log(yhsj)
                    var str=dateFormat("YYYY-mm-dd HH:MM", new Date())+"  "+path+" 成功备份到 "+yun_name
                    fs.appendFile(yhsj+"/information/jo.txt", str,  function(err) {
                        if (err) {
                            return console.error(err);
                        }
                     });
                })
                clearInterval(bac)
            } else {
                console.log("延迟了10秒")
            }
        }, 10000);

    })
}


//实现队列
var start = true//为true时表示当前没有任务在执行，false表示有任务在执行



// 备份功能
read_txt(yhsj + '/information/manaulTiming.txt', (information) => {
    var inf = information.slice(6)
    // console.log(inf)
    let result = split_array(inf, 6)
    //result备份任务信息,result[][0]文件夹在本地的路径。
    result.forEach((element) => {
        // back_time(element[0], element[1], element[2],["1",element[3],element[4],element[5]])
        back_time(element[0], element[1], element[2])
    })
})

