class ProductModel {
	constructor(
		_brand = '',
		_name = '',
		_price = 0.0,
		_stock = '',
		_caracteristics = '',
		_description = '',
		_mainCategory = '',
		_secondCategory = '',
		_pictureUrl = ''
	) {
		// if(_price)
		this.id = '';
		this.brand = cleanString(_brand);
		this.name = _name;
		this.price = toNumber(_price);
		this.stock = toNumber(_stock);
		this.caracteristics = newCaracteristics(_caracteristics);
		this.description = _description;
		this.mainCategory = _mainCategory;
		this.secondCategory = _secondCategory;
		this.pictureUrl = _pictureUrl;
		this.addedDate = Date.now();
		this.sells = 0;
	}
}

function toNumber(val = '') {
	if (val.includes(',')) {
		val = val.replace(',', '.');
	}

	val = Number(val);

	if (val.toString() == 'NaN' || val < 0) {
		return 0;
	} else {
		return val;
	}
}
function newCaracteristics(val = '') {
	val = val.split('\r\n');
	for (let index = 0; index < val.length; index++) {
		val[index] = val[index].trim();
	}
	return val;
}

function cleanString(val = '') {
	val = val.trim();
	val = val.toLowerCase();
	return val;
}

export { ProductModel };
