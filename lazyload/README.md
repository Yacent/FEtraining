# lazyload plugin (usable for jQuery and Zepto)


## 实现思路

1. 为需要进行懒加载的图片添加类. eg: .lazy-load
2. 设置图片触发敏感度，< 敏感度，触发加载.
3. 设置函数节流，避免过多|过快再次触发函数，可能导致页面卡死或不响应

## 配置方法
1. 引入
  ```javascript
<script type="text/javascript" src="http://cdn.bootcss.com/jquery/3.1.0/jquery.min.js"></script>
<script type="text/javascript" src="lazyload.js"></script>
  ```

2. HTML 当中设置 `<img>` 标签
  ```javascript
<img class="lazy-load" data-src="1.jpg" width="640px" height="640px">
  ```
  `data-src`即图片请求的地址，在js当中通过`$.data('src')`获取实际请求地址
  懒加载开始后，将`data-src`对应的值设置为`<img>`标签的 `src`属性
  **建议 提前设置好图片的宽高** 也可直接在类上面定义宽高

3. 使用 lazyload
  ```javascript
  // lazyload is a function of $.fn
$('.lazy-load').lazyload()
  ```
  调用 `lazyload()` 方法，即可让所有添加了 `lazy-load` 类的元素进行懒加载
