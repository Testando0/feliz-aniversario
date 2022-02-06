class Spark {
	constructor(x, y, vx, vy, color) {
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.color = color;
	}
	render(data, width, height) {
		let x = Math.round(this.x);
		let y = Math.round(this.y);
		if(x < 0 || x >= width) {
			return;
		}
		if(y < 0 || y >= height) {
			return;
		}
		let index = 4 * (y * width + x);
		if(data[index + 3] > this.color.a) { // do not draw over particles that are more visible
			return;
		}
		data[index + 0] = this.color.r;
		data[index + 1] = this.color.g;
		data[index + 2] = this.color.b;
		data[index + 3] = this.color.a;
	}
	update(gx, gy, dt) {
		this.vx += gx * dt;
		this.vy += gy * dt;
		this.x += this.vx * dt;
		this.y += this.vy * dt;

		this.color.a -= 120 * dt;
	}
}

export {Spark};
