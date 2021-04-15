import { checkDB, dbProducts, getAllProductsId } from './dbFunctions.js';
checkDB();

let hide_headers_index = [0, 0];

const dataSet = {
	headers: fillHeader(),
	rows: fillData(),
};
$(document).ready(function () {
	$('#dataTable').DataTable({
		data: dataSet.rows,
		columns: dataSet.headers,
		columnDefs: [
			{
				targets: [hide_headers_index[0]],
				visible: false,
				searchable: false,
			},
			{
				targets: [hide_headers_index[1]],
				visible: false,
				searchable: false,
			},
		],
	});
});
function fillHeader() {
	let headers = Object.keys(dbProducts[0]);
	let header_obj = [];
	headers.forEach((header, index) => {
		header_obj.push({ title: header });

		if (header == 'caracteristics') {
			hide_headers_index[0] = index;
		}
		if (header == 'description') {
			hide_headers_index[1] = index;
		}
	});
	// console.log(hide_headers_index);
	header_obj.push({ title: 'actions' });
	console.log(header_obj);
	return header_obj;
}

function fillData() {
	let dataList = [];

	let headers = Object.keys(dbProducts[0]);

	// console.log(headers);
	dbProducts.forEach((product, index) => {
		var auxList = [];

		let components = `<span class="icons">
	<a href="/products/editProduct.html?=${product.id}&loc=${index}"><i class="fas fa-edit"></i></a>
	<a href="/products/delete.html?=${product.id}&loc=${index}"
		><i class="fas fa-trash" style="color: rgb(202, 69, 69)"></i
	></a>
</span>`;

		//Here we fill all the data, based on the headers, and we put it all in a list, so it can be showed
		//in the dataTable
		headers.forEach((header) => {
			auxList.push(product[header]);
		});
		auxList.push(components);

		dataList.push(auxList);
	});

	return dataList;
}
