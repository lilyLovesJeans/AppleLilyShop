function set_cookie() {
    Cookies.set('yes_18', 'yes');
    $('.alert').css('display', 'none');
    $('.img_bkg img').css('display', 'block');
}

function goto_url() {
    window.location.href = 'https://www.google.com';
}


if (Cookies.get('yes_18') === 'yes') {
    $('.alert').css('display', 'none');
    $('.img_bkg img').css('display', 'block');
} else {
    $('.alert').css('display', 'block');
}
