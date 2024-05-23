

function init_elem_toast(){
    let elem_toast= document.querySelectorAll('.toast');
    // 遍歷所有.toast元素，並將 display 設置為 none
    elem_toast.forEach(
        function(toast) {
        toast.style.display = "none";
        });

}
function set_display_timeout(in_elem){
    in_elem.style.display="block";
    setTimeout(function(){
        in_elem.style.display="none";
    },5000)

}
function toastSuccess(){
    init_elem_toast();
    let elem_toast_success= document.querySelector('.toast-success');
    set_display_timeout(elem_toast_success);
 }


function  toastError(){
    init_elem_toast();
    let elem_toast_error= document.querySelector('.toast-error');
    set_display_timeout(elem_toast_error);
}