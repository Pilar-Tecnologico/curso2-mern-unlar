const category_btns = document.querySelectorAll('.category');
// console.log(category_btns);
category_btns.forEach((category) => {
	let each_btn = category.querySelectorAll('a');
	each_btn.forEach((btn) => {
		//console.log(btn.id);
		// console.log(btn.href);
		let categories = formatCategories(btn.id);
		if (categories.length > 1) {
			btn.href = `../products/category_prods.html?=${
				categories[0] + '/' + categories[1]
			}`;
		} else {
			btn.href = `../products/category_prods.html?=${categories[0]}`;
		}
	});
});

function formatCategories(category_name = '') {
	category_name = category_name.split('-');
	let new_words = [];
	for (let i = 0; i < category_name.length; i++) {
		new_words.push('');
		for (let k = 0; k < category_name[i].length; k++) {
			if (category_name[i][k] == '_') {
				new_words[i] += '-';
			} else {
				new_words[i] += category_name[i][k];
			}
		}
	}
	return new_words;
}
