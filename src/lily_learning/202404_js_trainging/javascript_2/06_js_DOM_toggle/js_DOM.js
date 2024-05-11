let elem_toDo = document.getElementById('to_do');
let elem_toDo_class= elem_toDo.className ;


elem_toDo.addEventListener("keypress",
    function(event){
        if(event.key === "Enter") {
            document.getElementById('add_List').click();
        }
    })

let elem_select = document.getElementById("list_level");
let elem_select_class= elem_select.className ;


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


    if (toDoValue!="") {

        let elem_li = document.createElement('li');

        if (elem_value_select == 'important'){
            elem_li.className = "important_li";
        }
        if (elem_value_select == 'urgent'){

            elem_li.className = "urgent_li";
        }


        let elem_span =  document.createElement('span');


        let app_ul = document.getElementById('toDoList');

        app_ul.append(elem_li);
        elem_li.append(elem_span);
        elem_span.textContent= toDoValue;
        elem_span.value=toDoValue;

        let elem_span_done =  document.createElement('span');

        elem_span.append(elem_span_done );
        elem_span_done.textContent="(已完成)"
        elem_span_done .setAttribute("class" , "done")

        let elem_del_btn =  document.createElement('button');
        elem_del_btn.textContent="✖︎";
        elem_del_btn.setAttribute("class", "del_btn");
        elem_del_btn.onclick= delItem;
        elem_span.append(elem_del_btn);

        let elem_toggle_btn =  document.createElement('button');
        elem_toggle_btn.textContent="";
        elem_toggle_btn.value="未完成";
        elem_toggle_btn.setAttribute("class", "on_off_btn");
        elem_toggle_btn.onclick = function() {
            toggleButtonText(elem_toggle_btn);
        };
        elem_span.append(elem_toggle_btn);

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


function exportList() {
    let lists = document.getElementsByTagName('li');

    if (lists.length !== 0) {
        let list = "";
        let num = 1;
        let text = "";
        let starts = "";
        // console.log(lists);
        for (let i = 0; i < lists.length; i++) {
            let listItems = lists[i].getElementsByTagName('span');
            let span_text = "";
            for (let j = 0; j < listItems.length; j++) {
                let para_classname = listItems[j].parentNode.className; 

                if (para_classname === 'important_li'){
                    starts = "*";
                } else if (para_classname === 'urgent_li'){
                    starts = "**";
                }
                if  (listItems[j].value ==undefined){
                    listItems[j].value="";
                }
                span_text += listItems[j].value + ' '; // 累加每個 span 的文字內容
            }

            if (span_text.trim() !== "") { // 檢查文字內容是否為空
                text += num.toString() + '. ' + starts + ' ' + span_text.trim() + ' ' + starts + "\n";
                num += 1;
            }
        }
        alert('今日待辦:\n' + text);
    }
}
