// todo 長這樣
// var todos = [
//     {
//       title: "倒垃圾",
//       category: "normal",
//       isCompleted: false
//     },
//     {
//       title: "繳電話費",
//       category: "important",
//       isCompleted: false
//     },
//     {
//       title: "採買本週食材",
//       category: "urgent",
//       isCompleted: false
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
    const export_btn = document.querySelector('#export_btn');
    const save_btn = document.querySelector('#save_btn');
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
    wrap.append(export_btn);
    wrap.append(save_btn);
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

function export_todos() {
    let export_msg = '';
    
    todos.forEach(function(item, index) {
        // 計算序號，從 1 開始
        const number = index + 1;
        
        // 根據 category 添加不同的格式
        let formattedTitle = item.title;
        if (item.category === 'important') {
            formattedTitle = `*${item.title}*`; // 用 * 包裹
        } else if (item.category === 'urgent') {
            formattedTitle = `**${item.title}**`; // 用 ** 包裹
        }
        
        
        // 根據 isCompleted 添加狀態描述
        const status = item.isCompleted ? '(已完成)' : '';
        
        // 添加序號、格式化後的待辦事項、狀態描述，每行之間加上換行符
        export_msg += `${number}. ${formattedTitle} ${status}\n`;
    });
    
    // 使用 alert 顯示匯出內容
    alert(export_msg.trim()); // 使用 trim() 去除結尾的多餘空格
}

// 儲存 todos 到 localStorage
function save_todos() {
    console.log('Saving todos...');
    // 將 todos 陣列轉換成 JSON 字串
    localStorage.setItem('todos', JSON.stringify(todos));
    alert('儲存成功!');
}

// 從 localStorage 載入 todos
function load_todos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        // 解析 JSON 字串並更新 todos 陣列
        todos = JSON.parse(savedTodos);
        render(); // 重新渲染待辦事項
    }
}
window.onload=()=>{
    render_wrap();
    load_todos(); 
};
