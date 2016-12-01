/*
 * 排序算法 - 冒泡排序
 * 		前后两项进行比较，使用临时变量进行存储，然后交换
 */
function bubble(arr) {
	var len = arr.length;
	for (var i = 0; i < len; i++) {
		for (var j = len - 1; j >= i; j--) {
			if (arr[j - 1] > a[j]) {
				var tmp = arr[j - 1];
				arr[j - 1] = a[j]
				arr[j] = tmp;
			}
		}
	}
}

var a = [5, 9, 18, 20, 22, 54, 1, 3, 11, 12, 11, 12];
bubble(a);