import {Spark} from './spark.js';

class Firework {
	constructor(x, y, vx, vy, color) {
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.color = color;

		this.sparks = [];
		this.exploded = false;
	}
	render(data, width, height) {
		for(let spark of this.sparks) {
			spark.render(data, width, height);
		}
	}
	update(gx, gy, dt) {
		this.vx += gx * dt;
		this.vy += gy * dt;
		this.x += this.vx * dt;
		this.y += this.vy * dt;
		for(let i = this.sparks.length - 1;i >= 0;i--) {
			this.sparks[i].update(gx, gy, dt);
			if(this.sparks[i].color.a <= 0) {
				this.sparks.splice(i, 1);
			}
		}

		if(this.vy >= 0 && !this.exploded) { // boom
			let amtSparks = Math.random() * (10000 - 2500) + 250; // rand * (max - min) + min
			let strength = Math.random() * (100 - 75) + 75; // rand * (max - min) + min
			for(let i = 0;i < amtSparks;i++) {
				let angle = Math.random() * 2 * Math.PI;
				let maxSpeed = Math.random() * (strength - strength / 2) + strength / 2; // rand * (max - min) + min
				let speed = Math.random() * maxSpeed;
				let color = {
					r: this.color.r,
					g: this.color.g,
					b: this.color.b,
					a: this.color.a
				}
				this.sparks.push(new Spark(this.x, this.y, speed * Math.cos(angle), speed * Math.sin(angle), color));
			}
			this.exploded = true;
		} else if(!this.exploded) {
			let color = {
				r: this.color.r,
				g: this.color.g,
				b: this.color.b,
				a: this.color.a
			}
			let angle = Math.random() * 2 * Math.PI;
			let speed = Math.random() * (10 - 5) + 5; // rand * (max - min) + min
			this.sparks.push(new Spark(this.x, this.y, speed * Math.cos(angle), speed * Math.sin(angle), color));
		}
	}
}

export {Firework};
