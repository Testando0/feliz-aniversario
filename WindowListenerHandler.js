let isModernBrowser = false;
let WindowListenerHandler = {
	defaultOptions: {
		capture: false,
		once: false,
		passive: true,
		signal: undefined
	}
};

try {
	let options = {
		get passive() {
			isModernBrowser = true;
		}
	}
	window.addEventListener('', null, options);
	window.removeEventListener('', null, options);
} catch(err) {}


if(isModernBrowser) {
	WindowListenerHandler.addListener = (function(type, listener, options = {}) { // .bind() doesnt work with arrow functions: https://stackoverflow.com/a/33308151/16707817
		for(let option in this.defaultOptions) {
			if(options[option] == 'default' || options[option] == undefined) {
				options[option] = this.defaultOptions[option];
			}
		}
		window.addEventListener(type, listener, options);
	}).bind(WindowListenerHandler);
} else {
	WindowListenerHandler.addListener = (function(type, lisneter, options = {}) {
		if(options.capture == 'default' || options.capture == undefined) {
			options.capture = this.defaultOptions.capture;
		}
		window.addEventListener(type, listener, options.capture);
	}).bind(WindowListenerHandler);
}

export {WindowListenerHandler};
