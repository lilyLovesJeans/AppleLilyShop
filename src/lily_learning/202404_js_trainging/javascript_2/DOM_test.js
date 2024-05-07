
//以下為 第一課練習
// let heading = document.createElement('h1');
// heading.textContent = '這是標題';

// let para =  document.createElement('p');
// para.textContent =  '這是段落文字';

// let app = document.getElementById('app');
// app.append(heading);
// app.append(para);


// let elem1 = document.createElement('div');
// elem1.textContent = 'level 1';

// let elem2 = document.createElement('div');
// elem2.textContent = 'level 2';

// let elem3 = document.createElement('div');
// elem3.textContent = 'level 3';


// app.append(elem1);
// elem1.append(elem2);
// elem2.append(elem3);


// let x = 123;
// let y ='hello';
// let z = document.createElement('div');

// console.log(x);
// console.log(y);
// console.log(z);

// function myFunction()
// {
//     alert('你點擊了按鈕！')
// }

// let btn = document.getElementById('my-btn');
// btn.onclick = myFunction;

// let app1 = document.getElementById('app1');
// alert(app1.children[0].textContent);
// alert(app1.children[1].textContent);

// let para = document.getElementById('para');
// alert(para.textContent);

// para.remove();

// let app1 = document.getElementById('app1');
// alert('app1: '+ app1.textContent);

// app1.remove();

// function hello()
// {

//     alert(event.target.textContent);
// }

let div1 =  document.getElementById('div1');
let div2 = document.getElementById('div2');

div1.className = div1.className + " border";
div2.className = div2.className + " border";
alert(div1.className);
alert(div2.className);