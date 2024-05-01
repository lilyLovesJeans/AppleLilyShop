function addList(){
    let elem_toDo = document.getElementById('to_do');
    let toDoValue = document.getElementById('to_do').value;
    
    if (toDoValue!="") {
        console.log(toDoValue);
        let elem_li = document.createElement('li');
        console.log(elem_li);
        let elem_span =  document.createElement('span');
        console.log(elem_span);
        let app_ul = document.getElementById('toDoList');
        console.log(app_ul);
        app_ul.append(elem_li);
        elem_li.append(elem_span);
        console.log(app_ul);
        elem_span.textContent= toDoValue;
        console.log(elem_span.textContent)
    }
    elem_toDo.value="";
    elem_toDo.focus();

}