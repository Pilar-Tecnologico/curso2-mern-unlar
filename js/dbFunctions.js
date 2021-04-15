let dbProducts = [];
let categories = {};
function checkDB() {
	if (localStorage.getItem('dbProducts') == null) {
		createLocalDB();
	} else {
		// localStorage.removeItem('dbProducts');
		dbProducts = JSON.parse(localStorage.getItem('dbProducts'));
		categories = JSON.parse(localStorage.getItem('Categories'));
	}
}

async function createLocalDB() {
	await fetch(
		'https://pilar-tecnologico.github.io/curso2-mern-unlar/DefaultDB.json'
	)
		.then((response) => response.json())
		.then((data) => {
			//Create Product Local DB
			const data_serialized = JSON.stringify(data['dbProducts']);
			localStorage.setItem('dbProducts', data_serialized);
			dbProducts = JSON.parse(localStorage.getItem('dbProducts'));

			//Create Categories Local DB
			const data2_serialized = JSON.stringify(data['Categories']);
			localStorage.setItem('Categories', data2_serialized);
			categories = JSON.parse(localStorage.getItem('Categories'));
		});
}

const getProductsSortedByDates = (oldToNew = true) => {
	let allDates = [];
	let sorted_products = [];

	//We get all the Dates
	for (let index = 0; index < dbProducts.length; index++) {
		allDates.push(dbProducts[index]['addedDate']);
	}

	//We sort the Dates
	//If old to new = true, we reverse the sort
	allDates = !oldToNew ? allDates.sort() : allDates.sort().reverse();

	//Now with the dates Sorted, we get Each product into a List and we return that
	allDates.forEach((date) => {
		for (let index = 0; index < dbProducts.length; index++) {
			if (dbProducts[index]['addedDate'] == date) {
				sorted_products.push([index, dbProducts[index]]);
			}
		}
	});
	return sorted_products;
};

const getProductsSortedBySells = (highToLow = true) => {
	let allSells = [];
	let sorted_products = [];

	//We get all the Dates
	for (let index = 0; index < dbProducts.length; index++) {
		allSells.push(dbProducts[index]['sells']);
	}

	//If high to low = true, we reverse the sort
	allSells = !highToLow ? allSells.sort() : allSells.sort().reverse();

	let counter = 0;
	allSells.forEach((date) => {
		for (let index = 0; index < dbProducts.length; index++) {
			if (dbProducts[index]['sells'] == date) {
				sorted_products.push([index, dbProducts[index]]);
			}
		}
	});

	return sorted_products;
};

const getProductsByCategory = (mainCategory = '', secondCategory = '') => {
	const prod_list = [];

	if (mainCategory != '') {
		if (secondCategory == '') {
			for (let index = 0; index < dbProducts.length; index++) {
				if (dbProducts[index]['mainCategory'] == mainCategory) {
					prod_list.push(dbProducts[index]);
				}
			}
		} else {
			for (let index = 0; index < dbProducts.length; index++) {
				if (
					dbProducts[index]['mainCategory'] == mainCategory &&
					dbProducts[index]['secondCategory'] == secondCategory
				) {
					prod_list.push(dbProducts[index]);
				}
			}
		}
		console.log(prod_list);
		return prod_list;
	} else return 'error';
};

const getProductById = (id = '') => {
	console.log(id);
	let prod = {};
	for (let index = 0; index < dbProducts.length; index++) {
		if (dbProducts[index]['id'] == id) {
			console.log(dbProducts[index]);
			prod = dbProducts[index];
			break;
		}
	}

	return prod;
};

const getProductByIndex = (index = '') => {
	return dbProducts[index];
};

const getAllProductsId = () => {
	var idList = new Map();

	dbProducts.forEach((product, index) => {
		//We get the product ID and the Index in the array
		idList.set(product.id, index);
	});

	return idList;
};

const saveProduct = (product) => {
	// console.log(product);
	let aprobar = product['name'] != '' && product['brand'] != '';
	let allId = getAllProductsId();
	if (aprobar) {
		let foundFreeId = false;
		let counter = 0;
		while (foundFreeId == false) {
			let idAux = `prod-${counter}`;

			if (allId.has(idAux)) {
				counter++;
			} else {
				product.id = idAux;
				dbProducts.push(product);
				foundFreeId = true;
			}
		}
		dbProducts = JSON.stringify(dbProducts);
		localStorage.setItem('dbProducts', dbProducts);
		checkDB();
		alert('New product Saved');
	} else {
		alert('Save Failed, Name and Brand cannot be empty');
	}
};

const updateProduct = (product, index = '') => {
	dbProducts[index] = product;
	dbProducts = JSON.stringify(dbProducts);
	localStorage.setItem('dbProducts', dbProducts);
	checkDB();
	alert('Product has been Updated');
};

const removeProductById = (id = '') => {
	let ids = getAllProductsId();

	if (ids.has(id)) {
		dbProducts.splice(ids.get(id), 1);
		dbProducts = JSON.stringify(dbProducts);
		localStorage.setItem('dbProducts', dbProducts);
		checkDB();
	}
};
export {
	dbProducts,
	categories,
	checkDB,
	saveProduct,
	getProductsSortedByDates,
	getProductsSortedBySells,
	getProductsByCategory,
	getProductById,
	getProductByIndex,
	getAllProductsId,
	removeProductById,
	updateProduct,
};
