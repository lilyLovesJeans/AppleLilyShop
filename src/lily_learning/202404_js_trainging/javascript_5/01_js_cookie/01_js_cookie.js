function set_cookie() {
    var inThreeMinutes = new Date(new Date().getTime() + 3 * 60 * 1000); //設定3分鐘expired
    Cookies.set('yes_18', 'yes' , {
        expires: inThreeMinutes
    });
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
