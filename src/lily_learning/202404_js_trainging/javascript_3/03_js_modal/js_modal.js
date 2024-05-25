
let block_modal = document.querySelectorAll('.modal');
// 初始化class:modal, 設定 全部 modal 的 display: none
function init_block_modal(){
    block_modal.forEach(
        function(modal){
            modal.style.display="none";
        }
    )
}

let elem_modal_wrap =
document.querySelector('.modal_wrap');

function close_modal(btn){
    btn.onclick= function(){
      elem_modal_wrap.style.display="none"  ;
    }
}
function loginModal(){
    elem_modal_wrap.style.display="block";
    let block_login = document.querySelector('#login-modal');
    init_block_modal();
    block_login.style.display="block";
    let btn = document.querySelector('#btn-close-login');
    close_modal(btn);
}


function postModal(){
    elem_modal_wrap.style.display="block";
    let block_post = document.querySelector('#post-modal');
    init_block_modal();
    block_post.style.display="block";
    let btn = document.querySelector('#btn-close-post');
    close_modal(btn);
}

