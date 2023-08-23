//Animated Clock

//Get Color Value and apply it to the clock

const faceColor = document.getElementById('face-color');
const borderColor = document.getElementById('border-color');
const lineColor = document.getElementById('line-color');
const largeHandColor = document.getElementById('large-hand-color');
const secondHandColor = document.getElementById('second-hand-color');

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
	ctx.strokeStyle = borderColor.value;
	ctx.fillStyle = faceColor.value;
	ctx.arc(0, 0, 142, 0, Math.PI * 2, true);
	ctx.stroke();
	ctx.fill();
	ctx.restore();

	//Draw hour lines
	ctx.save();
	ctx.strokeStyle = lineColor.value;
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
	ctx.strokeStyle = lineColor.value;
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

	//console.log(` ${hr} : ${min} : ${sec}`);

	//Calculate angle of hands
	ctx.save();
	ctx.rotate(
		(Math.PI / 6) * hr + (Math.PI / 360) * min + (Math.PI / 21600) * sec
	);

	ctx.strokeStyle = largeHandColor.value;
	ctx.lineWidth = 14;
	ctx.beginPath();
	ctx.moveTo(-20, 0);
	ctx.lineTo(80, 0);
	ctx.stroke();
	ctx.restore();

	//Draw Minute Hand
	ctx.save();
	ctx.rotate((Math.PI / 30) * min + (Math.PI / 1800) * sec);
	ctx.strokeStyle = largeHandColor.value;
	ctx.lineWidth = 10;
	ctx.beginPath();
	ctx.moveTo(-28, 0);
	ctx.lineTo(112, 0);
	ctx.stroke();
	ctx.restore();

	//Draw Second Hand

	ctx.save();
	ctx.rotate((sec * Math.PI) / 30);
	ctx.strokeStyle = secondHandColor.value;
	ctx.fillStyle = secondHandColor.value;
	ctx.lineWidth = 6;
	ctx.beginPath();
	ctx.moveTo(-30, 0);
	ctx.lineTo(100, 0);
	ctx.stroke();
	ctx.restore();
	ctx.beginPath();
	ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
	ctx.fill();

	ctx.restore(); // restore default state (this will undo the rotate transformation)
	requestAnimationFrame(clock);
}

requestAnimationFrame(clock);

//Event Listeners

faceColor.addEventListener('input', clock);
borderColor.addEventListener('input', clock);
lineColor.addEventListener('input', clock);
largeHandColor.addEventListener('input', clock);
secondHandColor.addEventListener('input', clock);

//Save The clock as Image

const saveBtn = document.getElementById('save-btn');
const downloadBtn = document.getElementById('download-btn');

saveBtn.addEventListener('click', () => {
	saveBtn.href = canvas.toDataURL();
	saveBtn.download = 'clock.png';
});

//Save clock image in a folder in my documents

downloadBtn.addEventListener('click', () => {
	const a = document.createElement('a');
	a.href = canvas.toDataURL();
	a.download = 'clock.png';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
});

//Reset settings

const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', () => {
	faceColor.value = '#f4f4f4';
	borderColor.value = 'black';
	lineColor.value = 'black';
	largeHandColor.value = 'black';
	secondHandColor.value = 'red';
	clock();
});
