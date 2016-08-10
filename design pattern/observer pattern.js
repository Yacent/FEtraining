// 观察者模式 subsribe/dispatch
var eventEmitter = {
	_events: {},

	dispatch: function(event, data) {
		if (!this.events[event]) {
			return;
		}
		for (var i = 0, l = this.events[event].length; i < l; i++) {
			this.events[event][i](data);
		}
	},

	subscribe: function(event, cb) {
		if (!this.events[event]) {
			this.events[event] = [];
		}
		this.events[event].push(cb);
	}
};


// 自定义事件实现 观察者模式
function eventEmitter() {
	this.handlers = {};
}

eventEmitter.prototype = {
	constructor: eventEmitter,

	subscribe: function(event, cb) {
		if (!this.handlers[event]) {
			this.handlers[event] = [];
		}
		this.handlers[event].push(cb);
	},

	dispatch: function(event, data) {
		if (!this.handlers[event]) {
			return;
		}
		for (var i = 0, l = this.handlers[event].length; i < l; i++) {
			this.handlers[event][i](data);
		}
	},

	unsubscribe: function(event, cb) {
		if (!this.handlers[event]) {
			return;
		}
		for (var i = 0, l = this.handlers[event].length; i < l; i++) {
			if (this.handlers[event][i].toString() == cb.toString()) {
				break;
			}
		}
		this.handlers[event].splice(i, 1);
	}
};
