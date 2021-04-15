$(document).ready(function () {
	$('#navbar-frame').load('/curso-mern-unlar/common/navbar.html');
	$('.footer-frame').load('/curso-mern-unlar/common/footer.html');
});

function ReplaceCharacter(word = '', find_char, replacing_char) {
	let new_word = '';
	for (let k = 0; k < word.length; k++) {
		if (word[k] == find_char) {
			new_word += replacing_char;
		} else {
			new_word += word[k];
		}
	}

	return new_word;
}

function Capitalize(word) {
	let first_letter = String(word)[0];
	first_letter = first_letter.toUpperCase();
	let new_word_1 = first_letter + String(word).substring(1);

	if (new_word_1.includes('_')) {
		new_word_1 = new_word_1.split('_');
		new_word_1[1] = Capitalize(new_word_1[1]);
		new_word_1.join();
		new_word_1 = ReplaceCharacter(new_word_1, ',', ' ');
	}

	return new_word_1;
}

export { Capitalize, ReplaceCharacter };
