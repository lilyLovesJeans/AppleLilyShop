tinymce.init({
    selector: 'textarea#tiny-menu', 
    plugins: [
        'advlist', 'autolink', 'link', 'image', 'lists', 'charmap', 'preview', 'anchor', 'pagebreak',
        'searchreplace', 'wordcount', 'visualblocks', 'visualchars', 'code', 'fullscreen', 'insertdatetime',
        'media', 'table', 'emoticons', 'help'
    ],
    branding: false
});

// Get TinyMCE content and display it below the editor
function getContent() {
    var content = tinymce.get('tiny-menu').getContent();
    if (content != null) {
        var displayContent = document.getElementById('display-content');
        var contentArea = document.getElementById('content-area');
        contentArea.innerHTML = content;
        displayContent.style.display = 'block'; // Ensure the element is displayed
    }
}

// Close the display-content element
function closeContent() {
    var displayContent = document.getElementById('display-content');
    displayContent.style.display = 'none';
}

// Execute getContent function when "發佈文章" button is clicked
document.getElementById('get-content').addEventListener('click', getContent);

// Execute closeContent function when the close button is clicked
document.getElementById('close-content').addEventListener('click', closeContent);
