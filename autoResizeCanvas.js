import {WindowListenerHandler} from './WindowListenerHandler.js';

Object.defineProperties(window, {
	'screenWidth': {
		get() {
			return window.innerWidth || document.documentElement?.clientWidth || document.body?.clientWidth;
		}
	},
	'screenHeight': {
		get() {
			return window.innerHeight || document.documentElement?.clientHeight || document.body?.clientHeight;
		}
	}
});

function autoResizeCanvas(canvas) {
	onresize();
	WindowListenerHandler.addListener('resize', onresize);
	function onresize(event) {
		canvas.width = screenWidth;
		canvas.height = screenHeight;
	}
}

export {autoResizeCanvas};
