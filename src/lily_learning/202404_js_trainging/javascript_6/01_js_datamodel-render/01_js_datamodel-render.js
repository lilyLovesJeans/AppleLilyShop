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
  
  function render() {
    const root = document.querySelector('#root');
    root.textContent = '';  // 清空之前的內容
  
    const ul = document.createElement('ul');
    
    // 使用 forEach 來迭代 todos 陣列中的每個物件
    todos.forEach(function(item) {
      const li = document.createElement('li');
      const title = document.createElement('span');
      title.textContent = item.title;  // 取得 item 中的 title 屬性
      li.append(title);
      ul.append(li);
    });
    
    root.append(ul);  // 將 ul 插入到 root 元素中
  }
  
  render();
  