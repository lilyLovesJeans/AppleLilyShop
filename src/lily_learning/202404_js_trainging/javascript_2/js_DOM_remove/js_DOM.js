function addList(){
    let elem_toDo = document.getElementById('to_do');
    let toDoValue = document.getElementById('to_do').value;

    function delItem() {
        let grandParent = event.target.closest('li');
        // alert(grandParent);
        grandParent.remove();
    }

    if (toDoValue!="") {
        console.log(toDoValue);
        let elem_li = document.createElement('li');
   
        let elem_span =  document.createElement('span');

        let elem_del_btn =  document.createElement('button');
        elem_del_btn.textContent="✖︎";
        elem_del_btn.onclick= delItem;

        let app_ul = document.getElementById('toDoList');

        app_ul.append(elem_li);
        elem_li.append(elem_span);
        elem_span.textContent= toDoValue;
        elem_span.append(elem_del_btn);
    }
    elem_toDo.value="";
    elem_toDo.focus();

}