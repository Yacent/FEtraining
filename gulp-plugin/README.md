#gulp-css-format
a package that can convert the each css rule to one line that accord with the standard of NEC

###**Install**
```
$ npm install --save-dev gulp-css-format
```

###**Usage**
`src/test.css`
```css
@charset "utf-8";
/* hasidhiasd */
body {
	position: absolute;
	background-color: #eee;
}
```

`gulpfile.js`
```
var gulp = require('gulp'),
    cssFormat = require('gulp-css-format');

gulp.task('css-format', function() {
    gulp.src('src/test.css')
    .pipe(cssFormat({indent: 1, hasSpace: true}))
    .pipe(gulp.dest('dist/'));
})
```

`dist/test.css`
```css
@charset "utf-8";
/*  hasidhiasd  */
body{ position: absolute;background-color: #eee; }
```

###**API**
####**cssFormat([options])**
Formating the css rule to the specific format

####**options**
Type: `object`
options used to reset some format of the plugin

+ property
    + indent {number | default: 0}
        + used to set the indent between selectors and declarations
    + hasSpace {boolean | default: false}
        + used to insert a space between the property and value
```javascript
{
    indent: 1,
    hasSpace: true
}
```

###**Reference**
`css` - gulp plugin

###**License**
MIT

###**Look here**
If you like it and use it smoothly.
Give me a star! I am just the fresh-man in FE

Github: https://github.com/Yacent/gulp-css-format
