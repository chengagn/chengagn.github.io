const confirm = document.querySelector('.Confirm');
const boi = document.querySelector('.Boi');
const btnDelete = document.querySelector('.Confirm-Body-Button_Delete');
const btnCancel = document.querySelector('.Confirm-Body-Button_Cancel');
const current = {
	happiness: 0.9,
	derp: 1,
	px: 0.5,
	py: 0.5
};
const target = { ...current };

confirm.addEventListener('mousemove', onMouseMove);
confirm.addEventListener('mouseleave', onMouseLeave);

function onMouseMove({ clientX: x, clientY: y }) {
	let dx1 = x - btnDelete.getBoundingClientRect().x - btnDelete.getBoundingClientRect().width * 0.5;
	let dy1 = y - btnDelete.getBoundingClientRect().y - btnDelete.getBoundingClientRect().height * 0.5;
	let dx2 = x - btnCancel.getBoundingClientRect().x - btnCancel.getBoundingClientRect().width * 0.5;
	let dy2 = y - btnCancel.getBoundingClientRect().y - btnCancel.getBoundingClientRect().height * 0.5;
	let px = (x - confirm.getBoundingClientRect().x) / confirm.getBoundingClientRect().width;
	let py = (y - confirm.getBoundingClientRect().y) / confirm.getBoundingClientRect().height;
	let distDelete = Math.sqrt(dx1 * dx1 + dy1 * dy1);
	let distCancel = Math.sqrt(dx2 * dx2 + dy2 * dy2);
	let happiness = Math.pow(distDelete / (distCancel + distDelete), 0.75);

	target.happiness = happiness;
	target.derp = 0;
	target.px = px;
	target.py = py;
}

function onMouseLeave() {
	target.happiness = 0.9;
	target.derp = 1;
	target.px = 0.5;
	target.py = 0.5;
}

function update() {
	for (let prop in target) {
		if (target[prop] === current[prop]) {
			continue;
		} else if (Math.abs(target[prop] - current[prop]) < 0.01) {
			current[prop] = target[prop];
		} else {
			current[prop] += (target[prop] - current[prop]) * 0.1;
		}
		boi.style.setProperty(`--${prop}`, current[prop]);
	}
	requestAnimationFrame(update);
}

update();