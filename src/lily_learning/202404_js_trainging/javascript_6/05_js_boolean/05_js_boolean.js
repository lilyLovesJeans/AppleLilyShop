// todos 會長的像這樣
// var todos = [
//     {
//       title: "倒垃圾",
//       category: "normal"
//     },
//     {
//       title: "繳電話費",
//       category: "important"
//     },
//     {
//       title: "採買本週食材",
//       category: "urgent"
//     },
//   ];


var todos = [];

function render_wrap(){
    const body = document.querySelector('body');
    const wrap = document.createElement('div');
    wrap.className='wrap';
    const h2 = document.createElement('h2');
    h2.textContent="To Do List";
    const hr = document.createElement('hr');


    // 取得現有的 input 和 button 元素
    const input_todo = document.querySelector('input');
    const add_btn = document.querySelector('#add_btn');

    // 新增事件急迫性
    const select = document.createElement('select');
    const option_normal = document.createElement('option');
    option_normal.value = 'normal';
    option_normal.textContent = '一般';
    option_normal.selected = true;
    
    const option_important = document.
    createElement('option');
    option_important.value = 'important';
    option_important.textContent = '重要';

    const option_urgent = document.createElement('option');
    option_urgent.value = 'urgent';
    option_urgent.textContent = '緊急';


    // 取得現有的 root 容器
    const root = document.querySelector('#root');

    select.append(option_normal);
    select.append(option_important);
    select.append(option_urgent);
    wrap.append(h2);
    wrap.append(hr);
    wrap.append(input_todo);
    wrap.append(select);
    wrap.append(add_btn);
    wrap.append(root);

    // 把 wrap 放到 body 裡面
    body.append(wrap);


    // 監聽 select 的變化
    select.addEventListener('change', function () {
        const selectedValue = select.value;
        select.className = ''; // 先重置 class
        if (selectedValue === 'important') {
            select.className += ' important';
        } else if (selectedValue === 'urgent') {
            select.className += ' urgent';
        }
    });


    // 監聽 input 元素的鍵盤事件
    input_todo.addEventListener('keydown', function(event) {
        // 檢查是否按下 Enter 鍵 (keyCode 13)
        if (event.key === 'Enter') {
            add(); // 執行 add 函式
        }
    });
}


function add()
{
  // 請寫出此函式內容（更新 todos 陣列）
    const input_todo = document.querySelector('input');
    const select_category = document.querySelector('select');

    let todo = input_todo.value.trim();  // 取得待辦事項的名稱
    let category = select_category.value;  // 取得選擇的分類
    let isCompleted = false;     //default值 未完成

    if(todo !== ''){
        // 將待辦事項以物件的形式加入 todos 陣列
        todos.push({
            title: todo,
            category: category,
            isCompleted: isCompleted
        });
        console.log(todos);
        render();
    }else {
        input_todo.focus();
        input_todo.placeholder = "新增待辦事項";
    }
    input_todo.value = '';
}

function render(){
    console.log('render....');
    const root = document.querySelector('#root');
    root.textContent='';
    const div_container = document.createElement('div');
    div_container.className = 'todos_container';
    const ul = document.createElement('ul');
    ul.className = 'todoList';

    todos.forEach(function(item, index){
        const li = document.createElement('li');
        const span = document.createElement('span');
        const toggleBtn = document.createElement('button');
        toggleBtn.className =  item.isCompleted ? 'btn_li btn_on' : 'btn_li btn_off';
        toggleBtn.textContent =  item.isCompleted ? '改為待完成' : '標示已完成';
        const delBtn = document.createElement('button');
        delBtn.className = "btn_li delBtn";
        delBtn.textContent = '刪除';

        // 切換完成狀態
        toggleBtn.onclick = () => {
            item.isCompleted = !item.isCompleted;  // 切換完成狀態
            render(); // 重新渲染
        }


        // 設定刪除按鈕的點擊事件，刪除對應的項目
        delBtn.onclick = () => {
            todos = todos.filter((_, i) => i !== index); // 移除該項
            render(); // 重新渲染
        };

        // 設定待辦事項的標題和分類
        span.textContent = item.title;

        // 如果已完成，標註「(已完成)」
        if (item.isCompleted) {
            const completedText = document.createElement('span');
            completedText.textContent = ' (已完成)';
            span.appendChild(completedText);
        }

        // 根據 category 設定 class 以改變樣式
        li.className = item.category;

        li.append(span);
        li.append(toggleBtn);
        li.append(delBtn);
        ul.append(li);
    });

    div_container.append(ul);
    root.append(div_container);
};


window.onload=()=>{
    render_wrap();
};
