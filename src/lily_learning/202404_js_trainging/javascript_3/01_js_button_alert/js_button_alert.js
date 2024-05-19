
function btn_close(in_elem){
    let para = in_elem.parentElement;
    let para_next_elem = para.nextElementSibling;
    if (para!=null){
        para.remove();
    }
    if (para_next_elem!=null){
        para_next_elem.remove();
    }

}