const load_products_btn = document.querySelector('#load_products_btn');

function set_display_timeout(in_elem){
    in_elem.style.display="block";
    setTimeout(function(){
        in_elem.style.display="none";
    },5000)

}
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
                
                const btn = document.createElement('button');
                btn.textContent = 'Details';

                li.appendChild(btn);
                btn.onclick = () => {
                    alert(`ID: ${product.id}\nCategory: ${product.category}\nDescription: ${product.description}`);
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
