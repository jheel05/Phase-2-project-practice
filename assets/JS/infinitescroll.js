let page = 1; 
const perPage = 20; 
const productsContainer = document.getElementById('products-container');

async function fetchProducts() {
    try {
        const response = await fetch(`https://dummyjson.com/products?page=${page}&perPage=${perPage}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products from API');
        }
        const data = await response.json();
        page++; 
        localStorage.setItem('products', JSON.stringify(data)); 
        return data;
    } catch (error) {
        console.error('Error fetching products:', error);
        const storedData = localStorage.getItem('products');
        if (storedData) {
            console.log('Fetching products from local storage');
            return JSON.parse(storedData);
        } else {
            alert('No data found');
            return [];
        }
    }
}




function renderProducts(response) {
    const products = response.products;
    if (!Array.isArray(products)) {
        console.error('Invalid products data:', products);
        return;
    }

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.thumbnail}" alt="${product.title}">
            <p>${product.description}</p>
        `;
        productsContainer.appendChild(productElement);
    });
}


async function handleIntersection(entries) {
    console.log("Intersection observed");
    if (entries[0].isIntersecting) {
        const products = await fetchProducts();
        renderProducts(products);
    }
}


const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 }); 
const sentinel = document.getElementById('sentinel');
observer.observe(sentinel);
