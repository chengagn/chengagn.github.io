var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var $ = function $(selector) {return document.querySelector(selector);};
var $$ = function $$(selector) {return document.querySelectorAll(selector);};
var tick = 0;

function lerp(n1, n2, speed) {
	return (1 - speed) * n1 + speed * n2;
}

function angle(from, to) {
	return Math.atan2(
	to[1] - from[1],
	to[0] - from[0]);

}

function distance(from, to) {
	return Math.sqrt(
	Math.pow(to[0] - from[0], 2),
	Math.pow(to[1] - from[1], 2));

}

function distNorm(from, to, xMax, yMax) {
	return Math.sqrt(
	Math.pow((to[0] - from[0]) / xMax, 2),
	Math.pow((to[1] - from[1]) / yMax, 2));

}

Array.prototype.lerp = function (target, speed) {var _this = this;
	this.forEach(function (n, i) {return _this[i] = lerp(n, target[i], speed);});
};var

Frame = function () {
	function Frame(node) {_classCallCheck(this, Frame);
		this.node = node;
		this.scale = 1;
		this.maxScale = 1.25;
		this.rotation = [0, 0, 0];
		this.translation = [0, 0, 0];
		this.center = [0, 0];
		this.target = [
		0.5 * window.innerWidth,
		0.5 * window.innerHeight];

		this.padding = [
		0.5 * this.node.clientWidth,
		0.5 * this.node.clientHeight];

		this.focus = false;
		this.mouseover = false;
		this.distance = 0;
		this.node.addEventListener('mousemove', this.hover.bind(this));
		this.node.addEventListener('mouseleave', this.hover.bind(this));
		this.setCenter();
	}_createClass(Frame, [{ key: 'setCenter', value: function setCenter()
		{
			var rect = this.node.getBoundingClientRect();
			this.center[0] = rect.left + this.padding[0];
			this.center[1] = rect.top + this.padding[1];
			return this;
		} }, { key: 'setTarget', value: function setTarget(
		target) {
			this.target[0] = target[0];
			this.target[1] = target[1];
			return this;
		} }, { key: 'setDistance', value: function setDistance()
		{
			this.distNorm = distNorm(this.center, this.target, window.innerWidth, 0.5 * window.innerHeight);
			return this;
		} }, { key: 'translate', value: function translate()
		{
			this.translation.lerp([
			0,
			0,
			this.mouseover ? 300 : 200 - this.distNorm * 400],
			0.15);
			return this;
		} }, { key: 'rotate', value: function rotate()
		{
			var theta = angle(this.center, this.target);
			this.rotation.lerp([
			Math.sin(-theta) * 60 * this.distNorm,
			Math.cos(theta) * 90 * this.distNorm],
			0.15);
			return this;
		} }, { key: 'update', value: function update()
		{
			this.node.style.transform = '\n\t\t\ttranslate3d(' +
			this.translation[0] + 'px,' + this.translation[1] + 'px,' + this.translation[2] + 'px) \n\t\t\trotateX(' +
			this.rotation[0] + 'deg) rotateY(' + this.rotation[1] + 'deg)\n\t\t';

		} }, { key: 'hover', value: function hover(
		e) {
			this.mouseover = e.type === 'mousemove';
		} }]);return Frame;}();var


Gallery = function () {
	function Gallery() {_classCallCheck(this, Gallery);
		this.container = $('.gallery');
		this.center = [
		0.5 * window.innerWidth,
		0.5 * window.innerHeight];

		this.mouse = this.center.slice(0);
		this.target = this.mouse.slice(0);
		this.container.addEventListener('mousemove', this.hover.bind(this));
		this.container.addEventListener('mouseleave', this.hover.bind(this));
		window.addEventListener('resize', this.resize.bind(this));
		this.initFrames();
		this.update();
	}_createClass(Gallery, [{ key: 'initFrames', value: function initFrames()
		{var _this2 = this;
			this.frames = [];
			$$('.frame').forEach(function (node) {return _this2.frames.push(new Frame(node));});
		} }, { key: 'resize', value: function resize()
		{
			this.center = [
			0.5 * window.innerWidth,
			0.5 * window.innerHeight];

			this.frames.forEach(function (frame) {return frame.setCenter();});
		} }, { key: 'hover', value: function hover(
		e) {
			this.mouseover = e.type === 'mousemove';
			this.target[0] = e.clientX;
			this.target[1] = e.clientY;
		} }, { key: 'update', value: function update()
		{var _this3 = this;
			this.mouse.lerp(
			this.mouseover ? this.target : this.center,
			0.125);

			this.frames.forEach(function (frame) {
				frame.setTarget(_this3.mouse).
				setDistance().
				translate().
				rotate().
				update();
			});
			this.container.style.perspectiveOrigin = this.mouse[0] + 'px 50%';
			window.requestAnimationFrame(this.update.bind(this));
		} }]);return Gallery;}();


var gallery = new Gallery();