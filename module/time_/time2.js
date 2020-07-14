/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Yang Han
 * @Date: 2020-06-03 11:41:43
 * @LastEditors: Yang Han
 * @LastEditTime: 2020-06-05 13:56:58
 */
$(function () {
    // console.log($('.default'));
    // 小卡片下滑
    $('.default').on('click', function () {
        $('.card2').css('display', 'none');
        $('.card3').css('display', 'none');
        $(".card1").slideDown(500);
        $('.card1').css('display', 'block');
    });
    // 小卡片下滑

    $('.manual').on('click', function () {
        $('.card1').css('display', 'none');
        $('.card3').css('display', 'none');
        $(".card2").slideDown(500);
        $('.card2').css('display', 'block');
    });
    // 子菜单下滑 
    $('.RegularBackup_f').on('click', function (e) {
        e = e || window.event;
        e.stopPropagation();
        if ($('.manual').css('display') == 'block' && $('.default').css('display') === 'block') {
            // $('.default').css('display', 'none');
            // $('.manual').css('display', 'none');
            $(".default").slideUp(500);
            $(".manual").slideUp(500);
            $(".default").removeClass('default_block');
            // $('.default').css('display', 'block');
            $(".manual").removeClass('manual_block');
            // console.log(true,$('.manual').css('display') == 'block' && $('.default').css('display') === 'block');


        } else {
            $(".default").slideDown(500);
            $(".manual").addClass('manual_block');
            $(".default").addClass('default_block');
            // $('.default').css('display', 'block');
            $(".manual").slideDown(500);
            // $('.manual').css('display', 'block');
            // console.log(false);
        }
    })

})

var card2_button = document.querySelector('.card2_button');
var card2 = document.querySelector('.card2');
var options = card2.querySelectorAll('option');
var card2_remember = card2.querySelector('.card2_remember');


var fs = require('fs')
var buf = new Buffer.alloc(10240);
var path=require("path")


card2_button.addEventListener('click', function () {

    fs.open(yhsj+'/information/manaulTiming.txt', 'r+', function(err, fd) {
        if (err) {
            
            return console.error(err);
        }
        //读取信息
        fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
            if (err){  
                console.log(err);
            }
            //获取账号信息
            information = buf.slice(0, bytes).toString().split(/\s+/);
            fs.appendFile(yhsj+'/information/manaulTiming.txt','\r'+localStorage.bdy_path+' '+localStorage.bdy_name+" "+localStorage.bdy +" "+"x"+" "+"x"+" "+"x", function(err){
                if(err)throw err;
                window.location.href="./time.html"
                setTimeout(()=>{
                    document.getElementById("tt").click()
                    },50)
            })
        });
    });
})


