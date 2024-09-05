
var todos = [
    {
      title: "倒垃圾"
    },
    {
      title: "繳電話費"
    },
    {
      title: "採買本週食材"
    },
  ];
  
  function render()
  {
    // 請寫出此函式內容
    const root = document.querySelector('#root');
    root.textContent='';
    const ul = document.createElement('ul');
    for (let item of todos) {
        console.log(item);
        const li = document.createElement('li');
        const title = document.createElement('span');
        title.textContent=item.title;
        li.append(title);
        ul.append(li);
    }
   root.append(ul);
    
  }
  
  render();