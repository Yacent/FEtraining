/* Quicksort
 * 快排
 */

function quickSort(arr) {
	if (arr.length <= 1) {
		return arr;
	}
	var middle = Math.floor(arr.length/2),
		pivot = arr.splice(middle, 1)[0],
		left = [],
		right = [];

	for (var i = 0, l = arr.length; i < l; i++) {
		if (arr[i] < pivot) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}
	return quickSort(left).concat([pivot], quickSort(right));
}