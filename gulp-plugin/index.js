var through = require('through2'),
    gutil = require('gulp-util'),
    css = require('css'),
    PluginError = gutil.PluginError;

const PLUGIN_NAME = 'gulp-css-format';

function convert2CSS(obj, indent, hasSpace) {

	var result = '';

	/**
	 * [设置{}与属性设置之间的间距]
	 * @return {string}   [需要设置的间距]
	 */
	var indentSetting = (function() {
		var tmpStr = '';
		for (var i = 0; i < indent; i++) {
			tmpStr += ' ';
		}
		return tmpStr;
	}());

	/**
	 * [设置 属性 key 与 value之间的的间距]
	 * @return {string}   [空 或者 单个空格]
	 */
	var spaceSetting = (function() {
		if (hasSpace) {
			return ' ';
		} else {
			return '';
		}
	}());

	var processCssRule = function(item, isMedia) {
		var ruleStr = '',
			propertyStr = '';

		item.declarations.forEach(function(prop) {
			propertyStr += prop.property + ':' + spaceSetting + prop.value + ';';
		});

		if (isMedia) {
			ruleStr = item.selectors + '{' + indentSetting + propertyStr + indentSetting + '}';
		} else {
			ruleStr = item.selectors + '{' + indentSetting + propertyStr + indentSetting + '}\r\n';
		}
		return ruleStr;
	}

	obj.stylesheet.rules.forEach(function(item) {
		var _type = item.type;
		if (_type !== 'rule') {
			switch(_type) {
				case 'comment':
					result += '/* ' + item.comment + ' */\r\n';
					break;
				case 'media':
					result += '@media ' + item.media + ' {';
					item.rules.forEach(function(item) {
						result += processCssRule(item, 1);
					});
					result += '}\r\n';
					break;
				case 'charset':
					result += '@charset ' + item.charset + ';\r\n';
					break;
				case 'import':
					result += '@import ' + item.import + ';\r\n';
					break;
			}
		} else {
			result += processCssRule(item);
		}
	});

	return result;
}

function gulpCssOneline(optionObj) {
	var option = {
		indent:0,
		hasSpace:false
	}

	if (!!optionObj) {
		if (typeof optionObj.indent !== 'number'
			|| typeof optionObj.hasSpace !== 'boolean') {
			throw new PluginError(PLUGIN_NAME, ': Wrong Plugin Option Value');
		}
		option = optionObj;
	}

    return through.obj(function(file, enc, cb) {
        var content = file.contents.toString();
        var cssObj = css.parse(content);

        if (!!cssObj.parsingErrors) {
			throw new PluginError(PLUGIN_NAME, ': CSS Syntax Error');
        }
        content = convert2CSS(cssObj, option.indent, option.hasSpace);
        file.contents = new Buffer(content);

        this.push(file);
        cb();
    });
}

module.exports = gulpCssOneline;
