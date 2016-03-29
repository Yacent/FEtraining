function deepEqual(a, b) {
	// produce Array
	if (isArray(a) && isArray(b)) {
		return isSameArray(a, b);
	}

	// produce object
	if (isObject(a) && isObject(b)) {
		return isSameObject(a, b);
	}

	if (a.toString() === b.toString()) {
		return true;
	}
	return false;
}

// determined whether it is array
function isArray(a) {
	return (Object.prototype.toString.call(a) === "[object Array]");
}

// determined whether it is object
function isObject(a) {
	return (typeof a === "object");
}

// get keys for object
// be care of that for in will get the key in prototype
function getKeys(obj) {
	var keys = [];
	for (var k in obj) {
		keys.push(k);
	}
	return keys;
}

// determined if the array a & b is equal
function isSameArray(a, b) {
	if (a.length !== b.length) {
		return false;
	}

	for (var i = 0, len = a.length; i < len; i++) {
		if (!deepEqual(a[i], b[i])) {
			return false;
		}
	}

	return true;
}

// determined if the object a & b is equal
function isSameObject(a, b) {
	var aKeys = getKeys(a);
	var bKeys = getKeys(b);

	if (aKeys.length !== bKeys.length) {
		return false;
	}

	//sort
	aKeys.sort();
	bKeys.sort();

	for (var i = 0, len = aKeys.length; i < len; i++) {
		var k = aKeys[i];

		// recursive deep equal
		if (!deepEqual(a[k], b[k])) {
			return false;
		}
	}

	return true;
}


// test!
var a = {a:1};
var b = {a:1};

console.log(deepEqual(a,b)); // return true