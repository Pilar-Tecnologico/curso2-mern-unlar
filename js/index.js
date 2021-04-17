import {
	getProductsSortedByDates,
	getProductsSortedBySells,
	checkDB,
} from './dbFunctions.js';
checkDB();

const best_productsDiv = document.getElementById('best-products');
const new_productsDiv = document.getElementById('new-products');

(function newProducts() {
	new_productsDiv.innerHTML = '';
	const products = getProductsSortedByDates();
	console.log(products);
	var loop_length = products.length > 3 ? 3 : products.length;
	for (let i = 0; i < loop_length; i++) {
		const data = products[i];
		const attributes = data[1];
		var component = `<div class="product" id="${attributes['id']}"><a href="./products/product-page.html?id=${attributes['id']}"><img src="${attributes['pictureUrl']}" alt="Imagen producto"/></a></div>`;
		new_productsDiv.innerHTML += component;
	}
})();

(function bestProducts() {
	best_productsDiv.innerHTML = '';
	const products = getProductsSortedBySells();
	var loop_length = products.length > 3 ? 3 : products.length;
	for (let i = 0; i < loop_length; i++) {
		const data = products[i];
		const attributes = data[1];
		var component = `<div class="product" id="${attributes['id']}"><a href="./products/product-page.html?id=${attributes['id']}"><img src="${attributes['pictureUrl']}" alt="Imagen producto"/></a></div>`;
		best_productsDiv.innerHTML += component;
	}
})();
