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

    // 取得現有的 root 容器
    const root = document.querySelector('#root');
 
    wrap.append(h2);
    wrap.append(hr);
    wrap.append(input_todo);
    wrap.append(add_btn);
    wrap.append(root);

    // 把 wrap 放到 body 裡面
    body.append(wrap);
}


function add()
{
  // 請寫出此函式內容（更新 todos 陣列）
    const input_todo = document.querySelector('input');
    console.log(input_todo.value);
    let todo = input_todo.value.trim();
    if(todo !== ''){
        todos.push(todo);
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
    const div_container=document.createElement('div');
    div_container.className='todos_container';
    const ul=document.createElement('ul');
    ul.className='totoList';
    todos.forEach(function(item){
        const li=document.createElement('li');
        li.textContent=item;
        ul.append(li);
    })


    div_container.append(ul);
    root.append(div_container);
};

window.onload=()=>{
    render_wrap();
};
