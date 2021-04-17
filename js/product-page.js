import {
	dbProducts,
	checkDB,
	getProductById,
	getProductsByCategory,
} from './dbFunctions.js';
import { Capitalize } from './commonJs.js';
checkDB();

const main_url = window.location.href;

const product = getProductById(main_url.split('=')[1]);
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
	//Clean the components
	cardComponent[0].innerHTML = '';
	let li = '';

	product.caracteristics.forEach((caracteristic) => {
		li += `<li>${caracteristic}</li>`;
	});

	let prodInfoComponent = `<div class="row">
    <div class="col-5">
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
    <div class="col-3" >
        <div class="row caracteristics-list">
            <ul>
                ${li}
            </ul>
        </div>
    </div>
    <div class="col price-info">
        <div class="row mt-5">
            <h1 class="price">${'$' + product['price']}</h1>
        </div>
        <div class="row p-4">
            <button class="btn btn-primary mb-2" id="cartBtn">Add to cart</button>
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

const relatedProd = $('.related-products');
async function loadRelatedProduct() {
	let mostrar = true;
	relatedProd[0].innerHTML = '';

	let allCategoryProducts = getProductsByCategory(
		product.mainCategory,
		product.secondCategory
	);

	//In this weird if
	//We first check if the second category contains at least 1 object to show
	//then we check if that single object is in fact the same object that the user already selected
	//if that's the case, it means we dont have anything to show from this category
	//so then, we try to get objects from other secondary category (within the main one)
	//So, ONLY when we really dont have ANYTHING related to this product, not even from same tech category, only then
	//we can show the "NO RELATED PRODUCTS AVAILABLE" title
	if (allCategoryProducts.length === 1) {
		if (allCategoryProducts[0].id === product.id) {
			allCategoryProducts = getProductsByCategory(product.mainCategory);
			if (allCategoryProducts.length === 1) {
				if (allCategoryProducts[0].id === product.id) {
					mostrar = false;
				}
			}
		}
	}

	if (mostrar) {
		let maxDisplay = 3;
		if (allCategoryProducts.length < maxDisplay) {
			maxDisplay = allCategoryProducts.length;
		}
		for (let index = 0; index < maxDisplay; index++) {
			if (allCategoryProducts[index].id === product.id) {
				//We dont need to show a reference to this same product page
				continue; //skips the loop iteration without executing the rest of the code
			}
			let component = `<div class="product" id="${
				allCategoryProducts[index].id
			}">
		<label>${
			Capitalize(allCategoryProducts[index].brand) +
			' ' +
			Capitalize(allCategoryProducts[index].name)
		}1</label>
		<a href="./product-page.html?id=${allCategoryProducts[index].id}"
			><img
				src="${allCategoryProducts[index]['pictureUrl']}"
				alt="Imagen producto"
		/></a>
	</div>`;

			relatedProd[0].innerHTML += component;
		}
	} else {
		relatedProd[0].innerHTML += '<h2><b>No Related Products available</h2>';
	}
}
await loadRelatedProduct();
loadProductInfo();
