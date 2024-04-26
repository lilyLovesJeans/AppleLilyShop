function goOrder(){
    const custName= document.getElementById('customer_name').value;
    let order_qty = document.getElementById('order_qty').value;
    let msg = '';
    order_qty = parseInt(order_qty);
    if ((custName == '') || (custName == null)) {
        msg = "請輸入姓名 ！！" ;
        alert(msg);
        document.getElementById('customer_name').focus();
    }
    else if ((isNaN(order_qty)))  {
       
        msg = "訂購數量 -》數字 ！！" ;
        alert(msg);
        document.getElementById('order_qty').focus();
    } else {

        const myMsg = '謝謝您對我們的衣服有興趣！請致電 0987-654-321，會有專人提供您報價！';
        const msg = custName + ', '+ myMsg;
        alert(msg);

        /* show 出訂單訊息 */
        document.querySelector('.order_container').style.display = 'block';
        
        document.getElementById('order_list_customer_name').textContent=custName;

        let menu_1 = document.getElementById('list_item_1');
        let menu_1_index = menu_1.selectedIndex;
        let menu_1_value = menu_1.options[menu_1_index].value;
        let menu_1_text = menu_1.options[menu_1_index].text;
        document.getElementById('order_list_item_1').textContent=menu_1_text;
        let price = 0;
        let promotion_msg = '「最近剛好是工廠週年慶，只要您今天來電下單，'
        if (menu_1_value == 'men') {
            price = 600;
            alert( promotion_msg+'我們將贈送您帥氣領帶！」');
        } else if  (menu_1_value == 'women'){
            price = 500;
            alert( promotion_msg+'我們將贈送您美麗圍巾！」');
        }

        let menu_2 = document.getElementById('list_itme_2');
        let menu_2_index = menu_2.selectedIndex;
        let menu_2_value = menu_2.options[menu_1_index].value;
        let menu_2_text = menu_2.options[menu_2_index].text;
        document.getElementById('order_list_item_2').textContent=menu_2_text;
        
        document.getElementById('list_order_qty').textContent=order_qty;
        let amt = 0;
        amt =  price * order_qty;
        let amt_formatted= amt.toLocaleString('en-US');
        document.getElementById('list_order_amt').textContent=amt_formatted;
  
    };
    
};

function aboutMe(){
    alert('我們工廠位於新北市，通過國際 ISO9001 認證，品質讓您放心！');
}


