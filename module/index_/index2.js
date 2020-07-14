window.addEventListener('DOMContentLoaded', function () {
   
    for (let i = 0; i < $('.right button').length; i++) {
        $('.right button')[i].addEventListener('click', function () {
            let div = $('.div_block').get(i);
            if ($(div).css('display') === 'block') {
                let strong = $('.right button > strong')[i];
                strong.innerHTML = '<img src="../img/right.png" style="width: 15px;height: 15px;">';
                $(div).slideUp(300);
            // $(div).css('display', 'none');
            } else {
                let strong = $('.right button > strong')[i];
                strong.innerHTML = '<img src="../img/down.png" style="width: 15px;height: 10px;">';
                $(div).slideDown(300);
            // $(div).css('display', 'block');
            }
        })
    }

  
})

var btn = document.getElementsByTagName("button");
for(let key in btn){
    btn[key].onmousedown = function (){
        btn[key].style.background = "#beedff"
        btn[key].style.border = "1px solid #aae3fa"
    }
    btn[key].onmouseover = function (){
        btn[key].style.background = "#DAF5FF"
    }
    btn[key].onmouseout = function (){
        btn[key].style.background = "white"
        btn[key].style.border = 0
    }
}