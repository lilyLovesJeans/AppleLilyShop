let elem_toDo = document.getElementById('to_do');
let elem_toDo_class= elem_toDo.className ;

console.log('toDo Class: ' + elem_toDo_class );

elem_toDo.addEventListener("keypress",
    function(event){
        if(event.key === "Enter") {
            document.getElementById('add_List').click();
        }
    })

let elem_select = document.getElementById("list_level");
let elem_select_class= elem_select.className ;

console.log('select Class: ' + elem_select_class );

// 監聽選擇框的變化
elem_select.addEventListener("change", function() {
    // 取得當前選擇的選項值
    let selectedValue = elem_select.value;

    // 根據選擇的值來決定文字顏色
    if (selectedValue === "important") {
        elem_select.className = elem_select_class + 
        " important_li";
        elem_toDo.className = 
        elem_toDo_class +
        " important_li";
    } else if (selectedValue === "urgent") {
        elem_select.className = 
        elem_select_class + 
        " urgent_li";
        elem_toDo.className = 
        elem_select_class +
        " urgent_li";
    } 
    else {
        elem_select.className = elem_select_class;
        elem_toDo.className = elem_toDo_class
    } 
});


function addList(){
    let toDoValue = document.getElementById('to_do').value;
    let elem_value_select = 
    document.getElementById('list_level').value;
    console.log('select_value: '+elem_value_select);

    function delItem() {
        let grandParent = event.target.closest('li');
        // alert(grandParent);
        grandParent.remove();
    }

    if (toDoValue!="") {
        console.log(toDoValue);

        
        let elem_li = document.createElement('li');

        if (elem_value_select == 'important'){
            elem_li.className = "important_li";
        }
        if (elem_value_select == 'urgent'){

            elem_li.className = "urgent_li";
        }


        let elem_span =  document.createElement('span');

        let elem_del_btn =  document.createElement('button');
        elem_del_btn.textContent="✖︎";
        elem_del_btn.onclick= delItem;

        let app_ul = document.getElementById('toDoList');

        app_ul.append(elem_li);
        elem_li.append(elem_span);
        elem_span.textContent= toDoValue;
        elem_span.value=toDoValue;
        elem_span.append(elem_del_btn);
    }
    elem_toDo.value="";
    elem_toDo.focus();

}

function exportList(){

    let lists = document.getElementsByTagName('span');

    if (lists.length!=0) {
        let list = "";
        let num = 1;
        let text = "";
        let starts = "";
        console.log(lists);
        for (list of lists) {
            let para_classname = list.parentNode.className; 
            console.log('para_classname: ' + para_classname)
            if (para_classname == 'important_li'){
                starts = "*";
            } else if (para_classname == 'urgent_li'){
                starts = "**";
            }
            text = text+ 
                   num.toString() + '. ' + 
                   starts + ' ' +
                   list.value +
                   ' '+starts +
                   "\n";
            num += 1;
            starts = "";
        }
        alert('今日待辦:\n' + text);
    }

}