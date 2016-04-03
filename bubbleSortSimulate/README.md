## 说明
用JS实现一个冒泡排序的过程

## 算法
	
	// core
	for (var i = 0; i < arr.len; i++) {
		for (var j = arr.len - 1; j > i; j--) {
			if (arr[j-1] > arr[j]) {
				var tmp = arr[j];
				arr[j] = arr[j-1];
				arr[j-1] = tmp;
			}
		}
	}

## 实现要点

1. 循环应记录当前i和j的位置
2. setInterval & setTimeout实现异步调用，即在每一小步进行暂定处理，完毕后，状态更新。延时返回函数 fire

## Screenshot
![screenshot.jpg](https://github.com/Yacent/FEtraining/blob/master/bubbleSortSimulate/screenshot.jpg?raw=true)
