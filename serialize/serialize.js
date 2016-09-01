// the achieve of serialize of the form

function serialize(form) {
	var parts = [],
		field = null,
		option,
		optValue;

	for (var i = 0, len = form.elements.length; i < len; i++) {
		field = form.elements[i];

		switch(field.type) {
			case "select-one",
			case "select-multiple":

				if (field.name.length) {
					for (var j = 0, optLen = field.options.length; j < optLen; j++) {
						option = field.options[j];

						if (option.selected) {
							optValue = '';
							if (option.hasAttribute) {
								optValue = option.hasAttribute('value') ? option.value : option.text;
							} else {
								optValue = option.attributes['value'].specified ? option.value : option.text;
							}
							parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue));
						}
					}
				}
				break;

			case undefined:
			case "file":
			case "submit":
			case "reset":
			case "button":
				break;

			case "checkbox":
			case "radio":
				if (!field.selected) {
					break;
				}

			default:
				if (field.name.length) {
					parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue));
				}
		}
	}
	return parts.join("&");
}