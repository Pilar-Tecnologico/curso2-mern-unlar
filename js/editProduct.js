import {
	dbProducts,
	categories,
	checkDB,
	getProductById,
	getProductByIndex,
	updateProduct,
} from './dbFunctions.js';
import { ProductModel } from './Product.js';
import { ReplaceCharacter, Capitalize } from './commonJs.js';
checkDB();

//Get document parts
const form = document.querySelector('form');
const inputs = document.querySelectorAll('input');
const textAreas = document.querySelectorAll('textarea');
const mainCategorySelectMenu = $('#mainCategory');
const secondCategorySelectMenu = $('#secondCategory');
const selectPictureBtn = document.getElementById('selectPicture');
const saveBtn = document.querySelector('.btn-primary');
const pictureSelector = $('.picture-selector');
const selectedPicture = document.getElementById('selectedPicture');
const selectMenuMainCategoryComponents = [];
const selectMenuSecondCategoryComponents = [];

const getIdAndIndex = () => {
	let a = [];
	let aux = window.location.href.split('?');
	aux = aux[1].split('&');
	let auxIndex = aux[1].split('=')[1];
	let auxId = aux[0].split('=')[1];

	return { id: auxId, index: auxIndex };
};

//We get the product
const product = getProductByIndex(getIdAndIndex().index);

//Evento que se dispara cuando hay un cambio en el boton de categoria principal
mainCategorySelectMenu.change(() => {
	let index = mainCategorySelectMenu[0].options.selectedIndex;
	let selection = mainCategorySelectMenu[0].options[index].value;
	displaySecondaryCategories(selection);
	changeDefaultPicture();
	loadPictureBox();
});

secondCategorySelectMenu.change(() => {
	changeDefaultPicture();
	loadPictureBox();
});

selectPictureBtn.addEventListener('click', (e) => {
	e.preventDefault();

	pictureSelector.css('display', 'grid');

	loadPictureBox();
});

function changeDefaultPicture() {
	let pictureUrl = loadImages();
	selectedPicture.src = pictureUrl[0];
	selectedPicture.id = 0;
}

function displaySecondaryCategories(index) {
	secondCategorySelectMenu[0].innerHTML = '';

	categories[index].forEach((category) => {
		let new_select_option = `<option value="${category}">${ReplaceCharacter(
			Capitalize(category),
			'-',
			' '
		)}</option>`;
		secondCategorySelectMenu[0].innerHTML += new_select_option;
	});
}

function loadPictureBox() {
	pictureSelector[0].innerHTML = '';

	//Create the urls based on the localhost/img/etc
	let pictureUrl = loadImages();

	//Now we add the elements to the html container
	let counter = 1;
	pictureUrl.forEach((url) => {
		let imgUrl = `<img class="img-${counter}" src="${url}" alt="" id="img-${counter}" />`;
		pictureSelector[0].innerHTML += imgUrl;
		counter++;
	});

	//Finally, we create an OnClick event with JQuery, so when the user click on an Image, we can know what image was.
	$('.picture-selector > img').on('click', (e) => {
		selectedPicture.src = e.target.src;
		selectedPicture.id = e.target.id;
		pictureSelector.css('display', 'none');
	});
}

function loadImages() {
	let pictureUrl =
		'https://pilar-tecnologico.github.io/curso2-mern-unlar/img/Categories/';

	let index_1 = mainCategorySelectMenu[0].options.selectedIndex;
	let mainSelection = mainCategorySelectMenu[0].options[index_1].innerHTML;

	let index_2 = secondCategorySelectMenu[0].options.selectedIndex;
	let secondSelection = secondCategorySelectMenu[0].options[index_2].innerHTML;

	pictureUrl += mainSelection + '/' + secondSelection + '/';

	var listUrl = [];

	pictureUrl = ReplaceCharacter(pictureUrl, ' ', '-');

	for (let index = 1; index < 10; index++) {
		listUrl.push(`${pictureUrl}${index}.webp`);
	}
	return listUrl;
}

saveBtn.addEventListener('click', (e) => {
	e.preventDefault();

	let form_data = [];
	let formData = new FormData(form);
	formData.forEach((data) => {
		form_data.push(data);
	});
	form_data.push(selectedPicture.src);
	form_data[5] = form_data[5].replace(/(?:\r|\n|\r\n|\\r\\n|\\r|\\n)/g, '<br>');
	console.log(form_data);
	const new_product = new ProductModel(
		form_data[0],
		form_data[1],
		form_data[2],
		form_data[3],
		form_data[4],
		form_data[5],
		form_data[6],
		form_data[7],
		form_data[8]
	);
	new_product.id = getIdAndIndex().id;

	updateProduct(new_product, getIdAndIndex().index);
	window.location.replace(
		'https://pilar-tecnologico.github.io/curso2-mern-unlar/products/adminShowProduct.html'
	);
});

function arrangeSelectMainCategoryMenuV2() {
	//Obtengo el llavero 1
	let keys_1_mainCategory = Object.keys(categories);
	let keys_2_mainCategory = [];

	let keys_1_secondCategory = categories[product.mainCategory];
	let keys_2_secondCategory = [];

	for (let index = 0; index < keys_1_mainCategory.length; index++) {
		if (keys_1_mainCategory[index] == product.mainCategory) {
			keys_2_mainCategory.push(keys_1_mainCategory[index]);
			keys_1_mainCategory.splice(index, 1);
			break;
		}
	}

	for (let index = 0; index < keys_1_secondCategory.length; index++) {
		if (keys_1_secondCategory[index] == product.secondCategory) {
			keys_2_secondCategory.push(keys_1_secondCategory[index]);
			keys_1_secondCategory.splice(index, 1);
			break;
		}
	}

	//Lista Principal
	let finalSelectionMainCategoryMenuRawList = (
		keys_2_mainCategory +
		',' +
		keys_1_mainCategory
	).split(',');

	//Lista Secundaria
	let finalSelectionSecondCategoryMenuRawList = (
		keys_2_secondCategory +
		',' +
		keys_1_secondCategory
	).split(',');

	mainCategorySelectMenu[0].innerHTML = '';
	finalSelectionMainCategoryMenuRawList.forEach((category) => {
		mainCategorySelectMenu[0].innerHTML += `<option value="${category}">${ReplaceCharacter(
			Capitalize(category),
			'-',
			' '
		)}</option>`;
	});

	secondCategorySelectMenu[0].innerHTML = '';
	finalSelectionSecondCategoryMenuRawList.forEach((category) => {
		secondCategorySelectMenu[0].innerHTML += `<option value="${category}">${ReplaceCharacter(
			Capitalize(category),
			'-',
			' '
		)}</option>`;
	});
}
//Fills the inputs with the current Product Data
function loadData() {
	arrangeSelectMainCategoryMenuV2();
	let caracteristic = [];

	product['caracteristics'].forEach((c) => {
		caracteristic.push(c);
	});
	caracteristic = caracteristic.join('\r\n');

	inputs[0].value = product['brand'];
	inputs[1].value = product['name'];
	inputs[2].value = product['price'];
	inputs[3].value = product['stock'];
	textAreas[0].value = caracteristic;
	textAreas[1].value = product['description'];
}

loadData();
changeDefaultPicture();
