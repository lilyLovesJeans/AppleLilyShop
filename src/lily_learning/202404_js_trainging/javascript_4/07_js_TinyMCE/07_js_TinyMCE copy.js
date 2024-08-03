tinymce.init({
    selector: 'textarea#tiny-menu', 
    // width: 600,
    // height: 300,
    plugins: [
      'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
      'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
      'media', 'table', 'emoticons', 'help'
    ],
    branding: false ,
  });


  // 得到 TinyMCE 的文章內容並顯示在Tiny編輯器的下方
  function getContent() {
    var content = tinymce.get('tiny-menu').getContent();
    if (content != null) {
        var displayContent = document.getElementById('display-content');
        displayContent.innerHTML = content;
        displayContent.style.display = 'block'; // Ensure the element is displayed
    }
    }   



// 當按下 發佈文章 的按鈕時，執行getContent 函式
document.getElementById('get-content').addEventListener('click', getContent);