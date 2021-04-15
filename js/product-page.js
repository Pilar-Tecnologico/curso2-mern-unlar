import {
	dbProducts,
	checkDB,
	getProductsById,
	getProductsByCategory,
} from './dbFunctions.js';
import { Capitalize } from './commonJs.js';
checkDB();

const main_url = window.location.href;

const product = getProductsById(main_url.split('=')[1]);
const cardComponent = $('.card');
const breadcrum_mainCategory = document.querySelector(
	'#breadCrum-mainCategory'
);
const breadcrum_secondCategory = document.querySelector(
	'#breadCrum-secondCategory'
);
const breadcrum_product = document.querySelector('#breadCrum-product');
const pComponent = $('#prod-description');

function loadProductInfo() {
	cardComponent[0].innerHTML = '';
	let li = '';
	product.caracteristics.forEach((caracteristic) => {
		li += `<li>${caracteristic}</li>`;
	});

	let prodInfoComponent = `<div class="row">
    <div class="col">
        <div class="title">
            <h2>${Capitalize(product['brand']) + ' ' + product['name']}</h2>
        </div>
        <div class="selling-img">
            <img
                src="${product['pictureUrl']}"
                alt=""
            />
        </div>
    </div>
    <div class="col-2">
        <div class="row caracteristics-list">
            <ul>
                ${li}
            </ul>
        </div>
    </div>
    <div class="col-4 price-info">
        <div class="row">
            <h1 class="price">${'$' + product['price']}</h1>
        </div>
        <div class="row p-4">
            <button class="btn btn-primary mb-2">Add to cart</button>
            <button class="btn btn-secondary">Buy Now</button>
        </div>
        <div class="row" style="margin-left:2%">
            <label for="tag1" class="tags">${product['mainCategory']}</label>
            <label for="tag1" class="tags">${product['secondCategory']}</label>
        </div>
    </div>
</div>`;
	breadcrum_mainCategory.href = `../products/category_prods.html?=${product.mainCategory}`;
	breadcrum_mainCategory.innerHTML = `${Capitalize(product.mainCategory)}`;
	breadcrum_secondCategory.innerHTML = `${Capitalize(product.secondCategory)}`;
	breadcrum_secondCategory.href = `../products/category_prods.html?=${
		product.mainCategory + '/' + product.secondCategory
	}`;
	breadcrum_product.innerHTML = `${
		Capitalize(product.brand) + ' ' + Capitalize(product.name)
	}`;
	cardComponent[0].innerHTML += prodInfoComponent;
	pComponent[0].innerHTML = product['description'];
}

const relatedProductsDiv = document.getElementById('related-products');
async function loadRelatedProduct() {
	const allCategoryProducts = getProductsByCategory(
		product.mainCategory,
		product.secondCategory
	);
	console.log(allCategoryProducts.length);
	let randomIndexes = [
		Math.floor(Math.random() * allCategoryProducts.length + 0),
		Math.floor(Math.random() * allCategoryProducts.length + 0),
		Math.floor(Math.random() * allCategoryProducts.length + 0),
	];
	console.log(randomIndexes);
	let contador = 0;
	for (let i = 0; i < randomIndexes.length; i++) {
		for (let j = 0; j < randomIndexes.length; j++) {
			while (randomIndexes[i] == randomIndexes[j] && contador < 100) {
				randomIndexes[j] = Math.floor(Math.random() * 3 + 1);
				contador++;
				console.log(randomIndexes[j]);
			}
		}
	}

	console.log(randomIndexes);
}
await loadRelatedProduct();
loadProductInfo();
