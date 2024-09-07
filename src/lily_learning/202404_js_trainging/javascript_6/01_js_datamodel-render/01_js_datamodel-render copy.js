var product = {
    name: "冬季外套",
    price: 1990,
    category: "women",
    remain: 5
  };
  
  render();
  
  function render()
  {
    var root = document.querySelector('#root');
    root.textContent = "";
  
    var name = document.createElement('div');
    name.textContent = '商品名稱：' + product.name;
    var price = document.createElement('div');
    price.textContent = '價格：' + product.price;
    var category = document.createElement('div');
    category.textContent = '分類：' + product.category;
    var remain = document.createElement('div');
    remain.textContent = '剩餘數量：' + product.remain;
  
    root.append(name);
    root.append(price);
    root.append(category);
    root.append(remain);
  }
  
  function decrease()
  {
    product.remain = product.remain - 1;
  
    render();
  }
  
  function increase()
  {
    product.remain = product.remain + 1;
  
    render();
  }