function goOrder(){
    const custName= document.getElementById('customer_name').value;
    if ((custName == '') || (custName == null)) {
        const msg = "請輸入姓名 ！！" ;
        alert(msg);
        document.getElementById('customer_name').focus();

    } else {

        const myMsg = '謝謝您對我們的衣服有興趣！請致電 0987-654-321，會有專人提供您報價！';
        const msg = custName + ', '+ myMsg;
        alert(msg);
        document.getElementById('order_list_customer_name').textContent=custName;
    };
    
};

function aboutMe(){
    alert('我們工廠位於新北市，通過國際 ISO9001 認證，品質讓您放心！');
}