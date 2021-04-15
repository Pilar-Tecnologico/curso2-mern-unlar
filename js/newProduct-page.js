import { ProductModel } from './Product.js';
import { checkDB, saveProduct, getAllProductsId } from './dbFunctions.js';
import { Capitalize, ReplaceCharacter } from './commonJs.js';
checkDB();
const form = document.querySelector('form');
const mainCategorySelect = $('#mainCategory');
const secondCategorySelect = $('#secondCategory');
const selectPicture = document.getElementById('selectPicture');
const submitBtn = document.querySelector('.btn-primary');
const pictureSelector = $('.picture-selector');
const selectedPicture = document.getElementById('selectedPicture');

const categories = {
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

//Cargamos el menu de Select, ni bien el documento terminó de cargar
$(document).ready((e) => {
	displaySecondaryCategories('smartphones');
	changeDefaultPicture();
});

//Evento que se dispara cuando hay un cambio en el boton de categoria principal
mainCategorySelect.change(() => {
	let index = mainCategorySelect[0].options.selectedIndex;
	let selection = mainCategorySelect[0].options[index].value;
	displaySecondaryCategories(selection);
	changeDefaultPicture();
	loadPictureBox();
});

secondCategorySelect.change(() => {
	changeDefaultPicture();
	loadPictureBox();
});

selectPicture.addEventListener('click', (e) => {
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
	secondCategorySelect[0].innerHTML = '';

	categories[index].forEach((category) => {
		let new_select_option = `<option value="${category}">${ReplaceCharacter(
			Capitalize(category),
			'-',
			' '
		)}</option>`;
		secondCategorySelect[0].innerHTML += new_select_option;
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
	let pictureUrl = '../img/Categories/';

	let index_1 = mainCategorySelect[0].options.selectedIndex;
	let mainSelection = mainCategorySelect[0].options[index_1].innerHTML;

	let index_2 = secondCategorySelect[0].options.selectedIndex;
	let secondSelection = secondCategorySelect[0].options[index_2].innerHTML;

	pictureUrl += mainSelection + '/' + secondSelection + '/';

	var listUrl = [];

	pictureUrl = ReplaceCharacter(pictureUrl, ' ', '-');

	for (let index = 1; index < 10; index++) {
		listUrl.push(`${pictureUrl}${index}.webp`);
	}
	return listUrl;
}

submitBtn.addEventListener('click', (e) => {
	e.preventDefault();

	let form_data = [];
	let formData = new FormData(form);
	formData.forEach((data) => {
		form_data.push(data);
	});
	form_data.push(selectedPicture.src);
	// str = str.replace(/(?:\r|\n|\r\n)/g, '<br>');
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

	saveProduct(new_product);
});
