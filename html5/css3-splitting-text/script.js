const list = document.querySelector("ul");
const items = document.querySelectorAll("li");
let bodyClass = "ghost";

list.addEventListener(
	"click",
	function (ev) {
		list.classList.add("pulse");
		list.classList.toggle("active");
		if (ev.target.tagName === "LI") {
			[].forEach.call(items, function (el) {
				el.classList.remove("active");
			});
			ev.target.classList.toggle("active");
			bodyClass = ev.target.getAttribute("data-val").toLowerCase();
			document.body.classList.add("loading");
			setTimeout(() => {
				document.body.className = bodyClass;
			}, 2000);
		}
	},
	false
);

Splitting();

document.addEventListener("DOMContentLoaded", function () {
	document.body.className = bodyClass;
});