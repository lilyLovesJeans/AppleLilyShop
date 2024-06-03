const elem_about_list = document.querySelector('.about_me');
function open_list(){
    
    elem_about_list.classList.toggle('open_list');
}

elem_about_list.onclick = open_list;