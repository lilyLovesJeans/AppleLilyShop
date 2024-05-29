function btn_submit(event) {
    event.preventDefault(); // 防止表單提交

    let valid = true;

    // 驗證暱稱
    let nickname = document.querySelector('#nick-name').value.trim();
    if (nickname === "" || nickname === null | nickname.length>40) {
        let elem_err_nickname = document.querySelector('.err-nick-name');
        elem_err_nickname.style.visibility = 'visible';
        valid = false;
    } else {
        let elem_err_nickname = document.querySelector('.err-nick-name');
        elem_err_nickname.style.visibility = 'hidden';
    }

    // 驗證電子郵件
    let email = document.querySelector('#email').value.trim();
    if (email === "" || !email.includes('@')) {
        let elem_err_email = document.querySelector('.err-email');
        elem_err_email.style.visibility = 'visible';
        valid = false;
    } else {
        let elem_err_email = document.querySelector('.err-email');
        elem_err_email.style.visibility = 'hidden';
    }

    // 驗證密碼
    let password = document.querySelector('#current-password').value.trim();
    if (password === "" || password.length < 8 || password.length > 100) {
        let elem_err_password = document.querySelector('.err-password');
        elem_err_password.style.visibility = 'visible';
        valid = false;
    } else {
        let elem_err_password = document.querySelector('.err-password');
        elem_err_password.style.visibility = 'hidden';
    }

    // 如果所有字段都有效，允許表單提交
    if (valid) {
                // 清空所有输入字段
                document.querySelector('#nick-name').value = '';
                document.querySelector('#email').value = '';
                document.querySelector('#current-password').value = '';
                document.querySelector('.toast-success').style.display='block';
        
    }
    else{
                document.querySelector('.toast-success').style.display='none'; //show 出註冊成功的訊息
    }
}
