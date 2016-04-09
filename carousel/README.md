# Carousel
轮播实现

##DEMO
http://codepen.io/yacent/pen/zqpbyO

## 实现要点
	1. 初始化变迁态
		-------------------------
		|   1   |   2   |   3   |
		-------------------------
	2. 实现循环轮播，需要前后添加部分节点以达到目的
			---------------------------------------------------------
			|   2   |   3   |   1   |   2   |   3   |   1   |   2   |
			---------------------------------------------------------
	current:	0		1		2		3		4		5		6
		current的值决定显示在页面上page的是哪一块
			condition1 → 
				1) 当current == 2并且向右滑动时，应当将current无动画地切换至 5
				   使用障眼法，无法发现该处变化 (PS: 去除transition属性)
				2) 上步骤完成后，current值更改为4，加动画变化，即调用carousel.transition方法
			condition2 →
				1) 当current == 4并且向左滑动时，应当将current无动画地切换至 1，其余同上
				2) 上步骤完成后，current值更改为2，其余同上
			condition3 →
				无上诉特殊情况，直接调用carousel.update函数
	3. 移动端滑动实现 touch event
		event:
			touchstart
			touchmove
			touchend

		touchlist:
			targetTouches: 位于当前 DOM 元素上的手指动作的列表
			touches: 当前位于屏幕上的所有手指动作的列表
			changedTouches: 涉及当前事件的手指动作的列表。例如，在一个 touchend 事件中，这将是移开手指

		ps:
		1) touchmove实现跟随指尖移动时，需去除动画效果，即 transition: none
		2) touchend事件中对于current的处理同上 PC端current值判断相同
		3) 事件监听与监听移除时，应为同一处理函数
			var tMove = this.touchmove.bind(this);
			document.addEventListener("touchmove", tMove, false);
			document.removeEventListener("touchmove", tMove, false);
			该方式绑定和去除的为同一函数

			若为下述情况：
			document.addEventListener("touchmove", this.touchmove.bind(this), false);
			document.removeEventListener("touchmove", this.touchmove.bind(this), false);
			两次bind之后，是不同的函数，类似于 function() 匿名函数

## Screenshot
![screenshot.jpg](https://github.com/Yacent/FEtraining/blob/master/carousel/screenshot.jpg?raw=true)