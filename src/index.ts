import { on } from "@aritz-cracker/browser-utils";

let scrollAnim = false;
function startScrollAnimation() {
	if (scrollAnim) {
		return;
	}
	scrollAnim = true;
	doScrollAnimation();
}
function doScrollAnimationTick() {
	const documentElement = document.documentElement;
	if (documentElement.scrollHeight == documentElement.clientHeight) {
		return;
	}
	const scrollTopMax = documentElement.scrollHeight - documentElement.clientHeight;
	documentElement.style.setProperty("--bg-y-percent", (documentElement.scrollTop / scrollTopMax * 100) + "%");
}
function doScrollAnimation() {
	doScrollAnimationTick();
	if (scrollAnim) {
		requestAnimationFrame(doScrollAnimation);
	}
}
on("scroll", () => {
	startScrollAnimation();
});

on("scrollend", () => {
	scrollAnim = false;
});
if (document.readyState == "loading") {
	document.addEventListener("DOMContentLoaded", doScrollAnimationTick);
	document.addEventListener("load", doScrollAnimationTick);
}
