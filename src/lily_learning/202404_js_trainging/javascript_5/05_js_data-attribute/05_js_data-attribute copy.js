const load_products_btn = document.querySelector('#load_products_btn');
//延遲5秒鐘
const set_display_timeout = (in_elem) =>{
// function set_display_timeout(in_elem){
    in_elem.style.display="block";
    setTimeout(function(){
        in_elem.style.display="none";
    },5000)

}
const do_delete = (product_id,in_elem,msg) =>{
    fetch('https://fakestoreapi.com/products/'+product_id,{
    // fetch('https://fakestoreapi.com/products/21',{
            method:"DELETE"
        })
            .then(res=>res.json())
            .then(json=>
                {
                //  in_elem.remove();
                    if(json === null){
                        msg.style.display='block';
                        set_display_timeout(msg);
                    }
                    else
                    {
                        in_elem.remove();
                    }
                })
            .catch(error => {
                msg.style.display='block';
                set_display_timeout(msg);
                console.error('Error delete products:', error);
            });
}

const show_detail = (detail_data) => {
    // console.log(detail_data);
    const elem_modal_wrap = document.querySelector('.modal_wrap');
    elem_modal_wrap.style.display = "block";
    const detail = document.querySelector('#detail-modal');
  
    const div_detail = document.createElement('div');
    const img = document.createElement('img');
    img.src = detail_data.dataset.image;
    img.alt = detail_data.dataset.product_title;  
    div_detail.appendChild(img);

    const span_id = document.createElement('span');
    span_id.textContent = detail_data.dataset.product_id;
    div_detail.appendChild(span_id);
   
    const span_category = document.createElement('span');
    span_category.textContent = detail_data.dataset.product_category;
    div_detail.appendChild(span_category);
    
    const span_description = document.createElement('span');
    span_description.textContent = detail_data.dataset.product_description;
    div_detail.appendChild(span_description);

    detail.appendChild(div_detail);

    const btn = document.querySelector('#btn-close');
    btn.onclick = () => {
        elem_modal_wrap.style.display = "none";
        div_detail.remove();
    }
};



const loadproducts = () => {
    const products_lists = document.querySelector('#products_lists');
    products_lists.innerHTML = ''; // Clear the list before loading new products
    const msg = document.querySelector('.msg');
    msg.style.display='none'; 
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            console.log(json);
            json.forEach(product => {
                const li = document.createElement('li');
                const img = document.createElement('img');
                img.src = product.image;
                img.alt = product.title;  
                li.appendChild(img);

                const span = document.createElement('span');
                span.textContent = product.title;
                li.appendChild(span);
                
                const detail_btn = document.createElement('button');
                detail_btn.textContent = 'Details';
                const detail_data =  document.createElement('div');
                detail_data.dataset.image =product.image;
                detail_data.dataset.product_title =product.image;
                detail_data.dataset.product_id = product.id;
                detail_data.dataset.product_category = product.category;
                detail_data.dataset.product_description = product.description;
                li.appendChild(detail_btn);
                // detail_btn.onclick = () => {

                //     alert(`ID: ${product.id}\nCategory: ${product.category}\nDescription: ${product.description}`);
                // }
                detail_btn.onclick = () => show_detail(detail_data);

                const del_btn = document.createElement('button');
                del_btn.textContent = 'Delete';
                li.appendChild(del_btn);
                del_btn.onclick = () => {
                    do_delete(product.id,li,msg);
                    // console.log(li);
                    // li.remove();
                }

                products_lists.appendChild(li);
            });
        })
        .catch(error => {
            msg.style.display='block';
            set_display_timeout(msg);
            console.error('Error fetching products:', error);
        });
}

load_products_btn.onclick = loadproducts;
