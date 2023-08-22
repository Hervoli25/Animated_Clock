//Animated Clock

function clock() {
	const now = new Date();
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');

	//setup canvas
	ctx.save(); // save the default state
	ctx.clearRect(0, 0, 500, 500); // clear the canvas
	ctx.translate(250, 250); // change the center to (250, 250) This will center the clock
	ctx.rotate(-Math.PI / 2); // rotate the canvas -90 degrees

	// Set default styles

	ctx.strokeStyle = 'black';
	ctx.fillStyle = '#f4f4f4';
	ctx.lineWidth = 5;
	ctx.lineCap = 'round';

	// Draw clock face/border
	ctx.save();
	ctx.beginPath();
	ctx.lineWidth = 14;
	ctx.strokeStyle = '#800000';
	ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
	ctx.stroke();
	ctx.fill();
	ctx.restore();

	//Draw hour lines
	ctx.save();
	for (let i = 0; i < 12; i++) {
		ctx.beginPath();
		ctx.rotate(Math.PI / 6);
		ctx.moveTo(100, 0);
		ctx.lineTo(120, 0);
		ctx.stroke();
	}

	ctx.restore();

	//Draw minute lines
	ctx.save();
	ctx.lineWidth = 5;
	for (let i = 0; i < 60; i++) {
		if (i % 5 !== 0) {
			ctx.beginPath();
			ctx.moveTo(117, 0);
			ctx.lineTo(120, 0);
			ctx.stroke();
		}
		ctx.rotate(Math.PI / 30);
	}
	ctx.restore();

	//Get Current Time
	const hr = now.getHours() % 12;
	const min = now.getMinutes();
	const sec = now.getSeconds();

	console.log(` ${hr} : ${min} : ${sec}`);

	//Calculate angle of hands

	ctx.restore(); // restore default state (this will undo the rotate transformation)
}

clock();
