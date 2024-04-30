let heading = document.createElement('h1');
heading.textContent = '這是標題';

let para =  document.createElement('p');
para.textContent =  '這是段落文字';

let app = document.getElementById('app');
app.append(heading);
app.append(para);


let elem1 = document.createElement('div');
elem1.textContent = 'level 1';

let elem2 = document.createElement('div');
elem2.textContent = 'level 2';

let elem3 = document.createElement('div');
elem3.textContent = 'level 3';


app.append(elem1);
elem1.append(elem2);
elem2.append(elem3);


let x = 123;
let y ='hello';
let z = document.createElement('div');

console.log(x);
console.log(y);
console.log(z);