const load_products_btn = document.querySelector('#load_products_btn');

// 延遲5秒鐘
const set_display_timeout = (in_elem) => {
    in_elem.style.display = "block";
    setTimeout(() => {
        in_elem.style.display = "none";
    }, 5000);
};

const do_delete = (product_id, in_elem, msg) => {
    fetch('https://fakestoreapi.com/products/' + product_id, {
        method: "DELETE"
    })
    .then(res => res.json())
    .then(json => {
        if (json === null) {
            msg.style.display = 'block';
            set_display_timeout(msg);
        } else {
            in_elem.remove();
        }
    })
    .catch(error => {
        msg.style.display = 'block';
        set_display_timeout(msg);
        console.error('Error delete products:', error);
    });
};

const loadproducts = () => {
    const products_lists = document.querySelector('#products_lists');
    products_lists.innerHTML = ''; // 清除列表之前的產品
    const msg = document.querySelector('.msg');
    msg.style.display = 'none';

    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => {
            json.forEach(product => {
                const li = document.createElement('li');
                const img = document.createElement('img');
                const span = document.createElement('span');
                const detail_btn = document.createElement('button');
                const del_btn = document.createElement('button');
                const title = document.querySelector('.title');
                const category = document.querySelector('.category');
                const description = document.querySelector('.description');
                const price = document.querySelector('.price');
                const image =  document.querySelector('.image');
                const modal_wrap = document.querySelector('.modal_wrap');

                img.src = product.image;
                img.alt = product.title;
                li.appendChild(img);

                span.textContent = product.title;
                li.appendChild(span);

                detail_btn.textContent = 'Details';
                li.dataset.title = product.title;
                li.dataset.category = product.category;
                li.dataset.description = product.description;
                li.dataset.price = product.price;
                li.dataset.image = product.image; // 保存圖片URL

                detail_btn.onclick = () => {
                    title.textContent = product.title;
                    category.textContent = product.category;
                    description.textContent = product.description;
                    price.textContent = `$${product.price}`;
                    image.src = product.image; // 設定圖片來源
                    image.alt = product.title; // 設定圖片的替代文字
                    modal_wrap.style.display = 'block';
                };
                li.appendChild(detail_btn);

                del_btn.textContent = 'Delete';
                del_btn.onclick = () => {
                    do_delete(product.id, li, msg);
                };
                li.appendChild(del_btn);

                products_lists.appendChild(li);
            });
        })
        .catch(error => {
            msg.style.display = 'block';
            set_display_timeout(msg);
            console.error('Error fetching products:', error);
        });
};

load_products_btn.onclick = loadproducts;

// 添加關閉按鈕的事件監聽
document.querySelector('#btn-close').onclick = () => {
    document.querySelector('.modal_wrap').style.display = 'none';
};
