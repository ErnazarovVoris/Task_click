const productsContainer = document.getElementById('products-list-vanilla');
const API_URL = 'https://fakestoreapi.com/products';

let allProducts = []; 

function attachAddToCartListeners() {
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.currentTarget.dataset.productId);
            
            const productToAdd = allProducts.find(p => p.id === productId); 

            if (productToAdd) {
                const event = new CustomEvent('productAddedToCart', { 
                    detail: { product: productToAdd } 
                });
                window.dispatchEvent(event);
            }
        });
    });
}

async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        allProducts = await response.json(); 
        renderProducts(allProducts);
    } catch (error) {
        console.error("Mahsulotlarni yuklashda xatolik:", error);
        productsContainer.innerHTML = '<p>Mahsulotlarni yuklashda xatolik yuz berdi.</p>';
    }
}

function renderProducts(products) {
    productsContainer.innerHTML = '<h2>Mahsulotlar</h2>';
    const productsGrid = document.createElement('div');
    productsGrid.className = 'products-grid'; 

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="add-to-cart-btn" data-product-id="${product.id}">
                Savatchaga qo'shish
            </button>
        `;
        productsGrid.appendChild(productCard);
    });
    
    productsContainer.appendChild(productsGrid);
    
    attachAddToCartListeners();
}

fetchProducts();