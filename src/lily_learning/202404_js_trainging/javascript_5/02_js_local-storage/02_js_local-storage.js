
let elem_toDo =  document.querySelector('#to_do')  ; 
let elem_toDo_class= elem_toDo.className ;
elem_toDo.addEventListener("keypress",
    function(event)
    {
        if(event.key === "Enter") {
            document.querySelector('#add_list').click();
        }
    }
)



let elem_select = document.querySelector("#list_level");
let elem_select_class= elem_select.className ;
// 監聽選擇框的變化
elem_select.addEventListener("change", 
    function() {
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
        } else if (selectedValue === "normal") {
            elem_select.className = 
            elem_select_class + 
            " normal_li";
            elem_toDo.className = 
            elem_select_class +
            " normal_li";
        } 
        // else {
        //     elem_select.className = elem_select_class;
        //     elem_toDo.className = elem_toDo_class
        // } 
    }
);



function addList(){
    let toDoValue = document.querySelector('#to_do').value;
    let elem_value_select = 
    document.querySelector('#list_level').value;


    if (toDoValue!="") {

        let elem_li = document.createElement('li');

        if (elem_value_select == 'important'){
            elem_li.className = "important_li";
        }
        if (elem_value_select == 'urgent'){

            elem_li.className = "urgent_li";
        }
        if (elem_value_select == 'normal'){

            elem_li.className = "normal_li";
        }


        let elem_ul = document.querySelector('#to_do_list_ul');
        let elem_div =  document.createElement('div');
        let elem_span_txt = document.createElement('span');

        elem_ul.append(elem_li);
        elem_li.append(elem_div);
        elem_div.setAttribute('class' , "todo_group")
        elem_div.append(elem_span_txt);
        elem_span_txt.textContent= toDoValue;
        elem_span_txt.value=toDoValue;
        elem_span_txt.setAttribute('class' , "todo_txt");

        let elem_span_done =  document.createElement('span');

        elem_div.append(elem_span_done );
        elem_span_done.textContent="(已完成)";
        elem_span_done.setAttribute('class' , "done");

        let elem_del_btn =  document.createElement('button');
        elem_del_btn.textContent="✖︎";
        elem_del_btn.setAttribute('class', "del_btn");
        elem_del_btn.onclick= delItem;
        elem_div.append(elem_del_btn);

        let elem_toggle_btn =  document.createElement('button');
        elem_toggle_btn.textContent="";
        elem_toggle_btn.value="未完成";
        elem_toggle_btn.setAttribute("class", "on_off_btn");
        elem_toggle_btn.onclick = function() {
            toggleButtonText(elem_toggle_btn);
        };
        elem_div.append(elem_toggle_btn);

    }
    elem_toDo.value="";
    elem_toDo.focus();

}


function delItem() {
    let grandParent = event.target.closest('li');
    // alert(grandParent);
    grandParent.remove();
}

function toggleButtonText(button) {
    var elem_done = button.parentElement.querySelector('.done')
    if (button.value === "未完成") {
        button.value ="已完成"
        button.textContent = "✔";
        elem_done.style.display = 'inline-block'; 
        elem_done.value=" (已完成)";

    } else {
        button.value ="未完成"
        button.textContent = "";
        elem_done.style.display = 'none'; 
        elem_done.value="";
    }
}


function exportList(action) {
    let lists = document.querySelectorAll('li');

    if (lists.length !== 0) {
        let list = [];
        let num = 1;
        let text = "";
        let stars = "";
        let list_level = "";
        
        for (let i = 0; i < lists.length; i++) {
            let listItems = lists[i].querySelectorAll('span');
            let span_text = "";
            let listItem_txt = "";
            let done = "no";

            for (let j = 0; j < listItems.length; j++) {
                let para_classname = lists[i].className;
                if (para_classname === 'important_li') {
                    list_level = "important_li";
                    stars = "*";
                } else if (para_classname === 'urgent_li') {
                    list_level = "urgent_li";
                    stars = "**";
                } else if (para_classname === 'normal_li') {
                    list_level = "normal_li";
                }

                if (listItems[j].className === 'todo_txt') {
                    listItem_txt = listItems[j].value;
                }
                if (listItems[j].className === 'done') 
                {
                    if (listItems[j].style.display === 'inline-block')
                    {
                        done = "yes";
                        listItems[j].value ="(已完成)";
                    } else {
                        listItems[j].value ="";
                    }
                }

                span_text += listItems[j].value + ' ';
            }

            if (span_text.trim() !== "") { // Check if the text content is not empty
                let listItemData = {
                    num: num.toString(),
                    list_level: list_level,
                    todo_txt: listItem_txt,
                    done: done
                };
                list.push(listItemData);
                text += num.toString() + '. ' + stars + ' ' + span_text.trim() + ' ' + stars + "\n";
                num += 1;
            }
        }
        
        // If the action is 'save', store the list in localStorage
        if (action === 'save') {
            localStorage.setItem('todoList', JSON.stringify(list));
            alert('待辦事項已儲存');
        } else if (action === 'export') {
            alert('今日待辦:\n' + text);
        }
    }
}



function loadList() {
    let storedList = JSON.parse(localStorage.getItem('todoList'));
    
    if (storedList && storedList.length > 0) {
        storedList.forEach(function(item) {
            let elem_li = document.createElement('li');
            elem_li.className = item.list_level;

            let elem_div = document.createElement('div');
            elem_div.setAttribute('class', 'todo_group');

            let elem_span_txt = document.createElement('span');
            elem_span_txt.textContent = item.todo_txt;
            elem_span_txt.setAttribute('class', 'todo_txt');
            elem_span_txt.value = item.todo_txt;  // 確保 `value` 屬性被設置

            elem_div.appendChild(elem_span_txt);

            let elem_span_done = document.createElement('span');
            elem_span_done.textContent = '(已完成)';
            elem_span_done.setAttribute('class', 'done');
            elem_span_done.style.display = item.done === 'yes' ? 'inline-block' : 'none';

            elem_div.appendChild(elem_span_done);

            let elem_del_btn = document.createElement('button');
            elem_del_btn.textContent = '✖︎';
            elem_del_btn.setAttribute('class', 'del_btn');
            elem_del_btn.onclick = delItem;

            elem_div.appendChild(elem_del_btn);

            let elem_toggle_btn = document.createElement('button');
            elem_toggle_btn.textContent = item.done === 'yes' ? '✔' : '';
            elem_toggle_btn.value = item.done === 'yes' ? '已完成' : '未完成';
            elem_toggle_btn.setAttribute('class', 'on_off_btn');
            elem_toggle_btn.onclick = function() {
                toggleButtonText(elem_toggle_btn);
            };

            elem_div.appendChild(elem_toggle_btn);

            elem_li.appendChild(elem_div);

            document.querySelector('#to_do_list_ul').appendChild(elem_li);
        });
    }
}


// 頁面載入時調用 loadList 函數
window.onload = loadList;
