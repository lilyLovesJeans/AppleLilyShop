// 程式碼說明, FAQ 的展開與晰合 ：
// 抓取所有 類別選取器 為 collapsible 的元素，
// 抓到之後 ，跑 for 迴圈
// 利用addEventListener 監聽當使用者按下「某個問題」的 click 事件時
// 呼叫調用函式 ，
// 調用情境(this) ，這個程式的 this 就是 button 元素，
//  button 元素自動偵測是否帶有該class 並做切換"active" class
// 下一步，判斷此 button 的下一個元素，其樣式名稱為 maxHeight, 
// 如果maxHeight 有值,表示目前這個問題的 答案是展開的，要將它閉合
//反之 ，則展開,並賦予scrollHeight 高度的值

var coll = document.querySelectorAll('.collapsible');

var coll = document.querySelectorAll('.collapsible');
var i;
console.log( coll);


for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");

    console.log(this);

    var content = this.nextElementSibling;

    console.log('this.nextElementSibling: ' , this.nextElementSibling
    )

    if (content.style.maxHeight){
      content.style.maxHeight = null;
      console.log('展開變閉合: '+ content.style.maxHeight)
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      console.log('閉合變展開: '+ content.style.maxHeight)
    } 
  });
}

