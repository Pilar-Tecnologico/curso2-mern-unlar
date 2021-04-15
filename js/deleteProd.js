import { checkDB, removeProductById } from './dbFunctions.js';
checkDB();

let main_url = window.location.href;

const getIdAndIndex = () => {
	let a = [];
	let aux = window.location.href.split('?');
	aux = aux[1].split('&');
	let auxIndex = aux[1].split('=')[1];
	let auxId = aux[0].split('=')[1];

	return { id: auxId, index: auxIndex };
};
removeProductById(getIdAndIndex().id);
window.location.replace('/products/adminShowProduct.html');
