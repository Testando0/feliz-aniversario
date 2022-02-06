import {autoResizeCanvas} from './autoResizeCanvas.js';
import {Firework} from './firework.js';

function createFirework() {
	let x = Math.random() * screenWidth;
	let maxvy = Math.sqrt(2 * gy * screenHeight) - 10;
	let minvy = 100;
	let vy = -(Math.random() * (maxvy - minvy) + minvy);
	let color = {
		r: Math.random() * 255,
		g: Math.random() * 255,
		b: Math.random() * 255,
		a: 255
	};
	fireworks.push(new Firework(x, screenHeight, 0, vy, color));
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
autoResizeCanvas(canvas);

const gx = 0;
const gy = 50;
let fireworks = [];

let previousFrame = performance.now();
function render() {
	let imgdata = ctx.createImageData(screenWidth, screenHeight);
	let data = imgdata.data;
	
	let dt = (performance.now() - previousFrame) / 1000;
	previousFrame = performance.now();

	if(Math.random() < 0.5) {
		createFirework();
	}

	for(let i = fireworks.length - 1;i >= 0;i--) {
		fireworks[i].update(gx, gy, dt);
		fireworks[i].render(data, screenWidth, screenHeight);
		if(fireworks[i].sparks.length == 0) {
			fireworks.splice(i, 1);
		}
	}


	ctx.putImageData(imgdata, 0, 0);
	requestAnimationFrame(render);
}
requestAnimationFrame(render);
