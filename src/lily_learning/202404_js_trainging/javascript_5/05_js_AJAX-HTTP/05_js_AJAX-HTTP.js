const load_products_btn = document.querySelector('#load_products_btn');
const set_display_timeout = (in_elem) =>{
// function set_display_timeout(in_elem){
    in_elem.style.display="block";
    setTimeout(function(){
        in_elem.style.display="none";
    },5000)

}
const do_fetch = (product_id,in_elem,msg) =>{
    fetch('https://fakestoreapi.com/products/'+product_id,{
    // fetch('https://fakestoreapi.com/products/21',{
            method:"DELETE"
        })
            .then(res=>res.json())
            .then(json=>
                {console.log(json);
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
const loadproducts = () => {
    const products_lists = document.querySelector('#products_lists');
    products_lists.innerHTML = ''; // Clear the list before loading new products
    const msg = document.querySelector('.msg');
    msg.style.display='none'; 
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            json.forEach(product => {
                const li = document.createElement('li');
                const img = document.createElement('img');
                img.src = product.image;
                img.alt = product.title;  
                
                li.appendChild(img);
                const span = document.createElement('span');
                span.textContent = product.title;
                li.appendChild(span);
                
                const detail = document.createElement('button');
                detail.textContent = 'Details';
                li.appendChild(detail);
                detail.onclick = () => {
                    alert(`ID: ${product.id}\nCategory: ${product.category}\nDescription: ${product.description}`);
                }

                const del = document.createElement('button');
                del.textContent = 'Delete';
                li.appendChild(del);
                del.onclick = () => {
                    do_fetch(product.id,li,msg);
                    console.log(li);
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
