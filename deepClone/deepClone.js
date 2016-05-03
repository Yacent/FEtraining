/*
 * 对象克隆
 * 支持基本数据类型及对象
 * 递归方法	
 */

function deepClone(obj) {
	var o;
	switch(typeof obj) {
		case 'undefined':
			break;

		case 'number':
			o = +obj;
			break;

		case 'string':
			o = obj + '';
			break;

		case 'boolean':
			o = obj;
			break;

		// object 需要判断 array 还是 Obejct, 并且要判断
		case 'object':
			if (Object.prototype.toString.call(obj) === '[object Array]') {
				o = [];
				for (var i = 0, l = obj.length; i < l; i++) {
					o.push(deepClone(obj[i]));
				}
			} else {
				o = {};
				for (var k in obj) {
					o[k] = deepClone(obj[k]);
				}
			}
			break;

		default:
			o = obj;
			break;
	}
	return o;
}

// a = {a: [1, 2, 3, 4], b: 2, c: 3}
// b = deepClone(a);