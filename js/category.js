import { dbProducts, checkDB, getProductsByCategory } from './dbFunctions.js';
import { Capitalize, ReplaceCharacter } from './commonJs.js';
checkDB();

const productDiv = $('.products');
const banner = $('.banner');
const main_url = window.location.href;
const category_list_ul = $('#category-list');

const category_list = {
	smartphones: ['devices', 'accessories'],
	computers: ['microprocessors', 'motherboards', 'memory-ram', 'hard-drives'],
	peripherals: [
		'headphones',
		'mouses',
		'keyboards',
		'monitors',
		'external-memories',
	],
	cameras: ['digital-cameras', 'accessories'],
	'consoles-and-games': ['consoles', 'videogames'],
};

function getCategories() {
	let categories = main_url.split('=')[1];
	categories = categories.split('/');
	return categories;
}

const categoryFromURL = getCategories();

const allProductsByMainCategory =
	categoryFromURL.length > 1
		? getProductsByCategory(categoryFromURL[0], categoryFromURL[1])
		: getProductsByCategory(categoryFromURL[0]);

function showAllproducts() {
	productDiv[0].innerHTML = '';
	console.log(allProductsByMainCategory);

	for (let index = 0; index < allProductsByMainCategory.length; index++) {
		let component = `<div class="product" id="${
			allProductsByMainCategory[index]['id']
		}">
    <a href="./product-page.html?id=${allProductsByMainCategory[index]['id']}"
        ><img
            src="${allProductsByMainCategory[index]['pictureUrl']}"
            alt="Imagen producto"
    /></a>
    <label for="product-price" id="product-price">${
			'$' + allProductsByMainCategory[index]['price']
		}</label>
    <div>
        <label for="product-name" id="product-name">${
					Capitalize(allProductsByMainCategory[index]['brand']) +
					' ' +
					allProductsByMainCategory[index]['name']
				}</label>
        <button class="btn btn-primary">Add to Cart</button>
    </div>
</div>`;
		productDiv[0].innerHTML += component;
	}
}

function setBreadCrumbs() {
	let _category_list = category_list;
	category_list_ul[0].innerHTML = '';

	let mainCat = '';

	if (categoryFromURL.length > 1) {
		_category_list = _category_list[categoryFromURL[0]];
		mainCat = categoryFromURL[0];
	} else {
		_category_list = _category_list[categoryFromURL];
		mainCat = categoryFromURL;
	}
	category_list_ul[0].innerHTML += `<li class="list-group-item c-item">
	<a href="/products/category_prods.html?=${mainCat}">All</a>
</li>`;

	_category_list.forEach((category) => {
		let component = `<li class="list-group-item c-item">
		<a href="/products/category_prods.html?=${
			mainCat + '/' + category
		}">${Capitalize(category)}</a>
	</li>`;
		category_list_ul[0].innerHTML += component;
	});

	banner[0].innerHTML = `<img
	src="../img/Categories/${mainCat}/banner-2.webp"
	class="banner-img"
	id="banner-img"
	alt="..."
/>`;
}
setBreadCrumbs();
showAllproducts();
