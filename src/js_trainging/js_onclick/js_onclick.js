function goOrder(){
    const custName= document.getElementById('customer_name').value;
    const myMsg = '謝謝您對我們的衣服有興趣！請致電 0987-654-321，會有專人提供您報價！';
    const msg = custName + ', '+ myMsg;
    alert(msg);
};
function aboutMe(){
    alert('我們工廠位於新北市，通過國際 ISO9001 認證，品質讓您放心！');
}