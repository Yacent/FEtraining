/**
 * lazyload plugin, for jquery and zepto
 * author: yacent
 * license: MIT
 *
 * pre:
 * 1. for html, the image u should set like this
 * 		<img class="lazy-laod" data-src="1.jpg" width="640px" height="640px">
 * 		set the data-src to recognize the lazyloaded img
 */

;(function(factory) {
	factory(window.jQuery || window.Zepto);
})(function($, undefined) {
	var win = window;

	/**
	 * [判断元素是否在可视区域内]
	 * @param  {[Element]}  ele [判断的元素]
	 * @return {Boolean}     [true: 在可视区内， false: 不在可视区内]
	 */
	function isInClientSight(ele) {
		var eleTop = ele.getBoundingClientRect().top,
			eleBottom = ele.getBoundingClientRect().bottom,
			eleScrollHeight = ele.scrollHeight,
			viewHeight = document.documentElement.clientHeight;

		/**
		 * [判断元素是否在可视区上方 || 在很下面，还未到加载的时候]
		 * {eleTop > viewHeight + eleScrollHeight} 相当于设置了图片加载的敏感度
		 */
		if ((eleBottom <= 0) || (eleTop > viewHeight + eleScrollHeight)) {
			return false;
		} else {
			return true
		}
	}

	/**
	 * [函数节流]
	 * @param  {[function]} func [函数节流中执行的真实函数]
	 * @param  {[Element]} args [元素节点]
	 * @return {[undefined]}
	 */
	function throttle(func, args) {
		clearTimeout(func.id);
		func.id = setTimeout(function() {
			func(args);
		}, 300);
	}

	/**
	 * [加载图片]
	 * @param  {[jq dom]} $ele [待操作的节点组]
	 * @return {[undefined]}
	 */
	function load($ele) {
		$ele.each(function(index, item) {
			var $item = $(item);
			if (!$item.data('src') || ($item.attr('load-status') === 'loaded')) {
				return;
			} else {
				if (isInClientSight(item)) {
					$(item).attr('src', $item.data('src'));
					$(item).attr('load-status', 'loaded');
					return;
				}
			}
		});
	}

	// $.fn.prototype上有 lazyload
	if (!$.fn.hasOwnProperty('lazyload')) {
		$.fn.lazyload = function() {
			var $ele = this;
			load($ele);

			$(win).on('resize', function() {
				throttle(load, $ele);
			});

			$(win).on('scroll', function() {
				throttle(load, $ele);
			})
			return this; //keep call chain
		}
	}
})
