var n1, n2, n3, n4, n5
read_txt(yhsj + '/information/qiniu.txt', (information) => {
    var s = 6 + localStorage.qiniu * 6

    n1 = information[s + 3]
    n2 = information[s + 1]
    n3 = information[s + 2]
    n4 = information[s + 4]
    n5 = information[s + 5]
    // console.log(n1+"----"+n2+"----"+n3+"----"+n4)
    // helloword1----GHiJIAMCNwh0HOwm6zjlFzxzltqFc-LFvyr9-NEr----vFspKzxik9OAgOZntlNirhipMOYqFBqdrscQy_Q6----2
    x(n1, n2, n3, n4)
})

//所有文件的key
var path_list = []


var time_plus
//获取全部文件并显示
function x(bucket, accessKey, secretKey, n) {
    console.log(bucket + "--" + accessKey + "--" + secretKey + "--" + n)
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

    // @param options 列举操作的可选参数
    //                prefix    列举的文件前缀
    //                marker    上一次列举返回的位置标记，作为本次列举的起点信息
    //                limit     每次返回的最大列举文件数量
    //                delimiter 指定目录分隔符
    var options = {
        limit: 10000,
        prefix: '',
    };
    bucketManager.listPrefix(bucket, options, function (err, respBody, respInfo) {
        if (err) {
            console.log(err);
            throw err;
        }
        if (respInfo.statusCode == 200) {
            //如果这个nextMarker不为空，那么还有未列举完毕的文件列表，下次调用listPrefix的时候，
            //指定options里面的marker为这个值
            // var nextMarker = respBody.marker;
            // var commonPrefixes = respBody.commonPrefixes;
            // console.log(nextMarker);
            // console.log(commonPrefixes);
            var items = respBody.items;

            var name = []
            var type = []
            var size = []
            
            items.forEach(function (item) {
                //   console.log(item.key);
                name.push(item.key)
                // console.log(item.putTime);
                
                // console.log(item.hash);
                // console.log(item.fsize);
                size.push(item.fsize)
                // console.log(item.mimeType);
                // console.log(item.endUser);
                //   console.log(item.type);
                type.push(item.type)
            });

            path_list = name.concat(type)
            create_j(name.concat(type), size, [], (res) => {
                main0.innerHTML = res

                tap1()
                tap_2()
                create_s(name.concat(type), (a, list, i, b) => {
                    a.ondblclick = function () {
                        if (list[list.length / 2 + i] == 1) {

                            path_1[path_1.length] = path_1[path_1.length - 1] + list[i] + "/"
                            x(path_1[path_1.length - 1])
                            a.ondblclick = null;
                        }

                    }

                    a.onclick = function () {
                        var siblings = this.parentNode.querySelectorAll('div');
                        var ppp = document.getElementsByClassName("ppp")
                        for (let i = 0; i < ppp.length; i++) {
                            ppp[i].scrollTop = 0
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
                        var l = 0
                        function plus() {
                            if (l >= 100) {
                                l = 0
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
            })

        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    });

}


//path本地文件路径；name文件名
function sc(bucket, accessKey, secretKey, n, path, name, callback) {
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


//上传功能
if (localStorage.qiniu_ == "true") {
    localStorage.qiniu_ = "false"
    var fs = require("fs")
    if (localStorage.up_type == 1) {
        console.log("上传文件夹")
        console.log(localStorage.bdy_name)//文件夹名字
        var ff = localStorage.bdy_path
        console.log(ff)//文件夹路径
        get_feles_path(ff, (e) => {
            localStorage.jdt = 0
            new_jdt()
            // console.log(e)
            // 上传文件
            var fs = require("fs")
            var n
            d(0)
            var l = 0//计数器
            function d(i) {

                sc(n1, n2, n3, n4, ff + "/" + e[i], ff + "/" + e[i], () => {
                    // console.log("完成了")
                    if (l < e.length - 1) {
                        // console.log(l+"---"+e.length)
                        l++
                        setTimeout(() => {
                            localStorage.jdt = ((l + 1) / e.length) * 100
                            console.log(localStorage.jdt)
                            d(l)
                        }, 2000)

                    } else {
                        l = 0
                    }

                })


            }
        })



    } else if (localStorage.up_type == 0) {
        //上传文件
        console.log("上传文件")
        console.log(localStorage.bdy_name)//文件夹名字
        var ff = localStorage.bdy_path
        console.log(ff)//文件夹路径
        localStorage.jdt = 0
        new_jdt()
        setTimeout(() => {
            sc(n1, n2, n3, n4, localStorage.bdy_path, localStorage.bdy_name, () => {
                console.log("完成了")
                localStorage.jdt = 100
            })

        }, 300)

    }

}


//删除文件
function del(bucket, accessKey, secretKey, n, name) {
    // console.log(bucket + "--" + accessKey + "--" + secretKey + "--" + n)

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


    var key = name;
    bucketManager.delete(bucket, key, function (err, respBody, respInfo) {
        if (err) {
            console.log(err);
            //throw err;
        } else {
            console.log(respInfo.statusCode);
            console.log(respBody);
        }
    });
}

//重命名
function rename(bucket, accessKey, secretKey, n, name, rename) {
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

    var srcBucket = bucket;
    var srcKey = name;
    var destBucket = bucket;
    var destKey = rename;
    // 强制覆盖已有同名文件
    var options = {
        force: true
    }
    bucketManager.move(srcBucket, srcKey, destBucket, destKey, options, function (
        err, respBody, respInfo) {
        if (err) {
            console.log(err);
            //throw err;
        } else {
            //200 is success
            console.log(respInfo.statusCode);
        }
    });
}


//获取文件信息
function sta(bucket, accessKey, secretKey, n, name, callback) {
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
    var key = name;
    bucketManager.stat(bucket, key, function (err, respBody, respInfo) {
        if (err) {
            console.log(err);
            //throw err;
        } else {
            if (respInfo.statusCode == 200) {
                callback(respBody)

            } else {
                console.log(respInfo.statusCode);
                console.log(respBody.error);
            }
        }
    });
}

//刷新下载链接
function x_dowl(accessKey, secretKey, url, callback) {
    var qiniu = require('qiniu')
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var cdnManager = new qiniu.cdn.CdnManager(mac);
    //URL 列表
    var urlsToRefresh = [
        "http://" + url,
    ];
    //刷新链接，单次请求链接不可以超过100个，如果超过，请分批发送请求
    cdnManager.refreshUrls(urlsToRefresh, function (err, respBody, respInfo) {
        if (err) {
            throw err;
        }
        console.log(respInfo.statusCode);
        if (respInfo.statusCode == 200) {
            // console.log(respBody)
            callback()
        }
    });

}

//获取下载链接
function dowl(ym, accessKey, secretKey, key, callback) {
    var qiniu = require('qiniu')
    var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    var config = new qiniu.conf.Config();
    var bucketManager = new qiniu.rs.BucketManager(mac, config);
    var publicBucketDomain = ym;
    // 公开空间访问链接
    var publicDownloadUrl = bucketManager.publicDownloadUrl(publicBucketDomain, key);
    // console.log(publicDownloadUrl);
    x_dowl(accessKey, secretKey, publicBucketDomain, () => {
        callback(publicDownloadUrl)
    })

}


//文件下载
function dow_file(url, filename, callback) {
    const request = require('request')
    const fs = require('fs')
    var stream = fs.createWriteStream(filename);
    request("http://" + url).pipe(stream).on('close', callback);
}
