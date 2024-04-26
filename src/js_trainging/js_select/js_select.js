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

        /* show 出訂單訊息 */
        document.querySelector('.order_container').style.display = 'block';
        
        document.getElementById('order_list_customer_name').textContent=custName;

        let menu_1 = document.getElementById('list_item_1');
        let menu_1_index = menu_1.selectedIndex;
     
        let menu_1_value = menu_1.options[menu_1_index].text;
        document.getElementById('order_list_item_1').textContent=menu_1_value;
        let menu_2 = document.getElementById('list_itme_2');
        let menu_2_index = menu_2.selectedIndex;

        let menu_2_value = menu_2.options[menu_2_index].text;
        document.getElementById('order_list_item_2').textContent=menu_2_value;
 
        
    };
    
};

function aboutMe(){
    alert('我們工廠位於新北市，通過國際 ISO9001 認證，品質讓您放心！');
}


