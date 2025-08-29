import { debounce } from "../utils/helpers";

(function () {
	const constants = {
		MOBILE_BREAKPOINT: 767
	};

	const pupils = document.querySelectorAll(".js-404-pupils");

	if (!pupils.length) {
		return;
	}

	const pupilConfig = {};
	const updatePupilSettings = () => {
		if (window.innerWidth <= constants.MOBILE_BREAKPOINT) {
			pupilConfig.start = -15;
			pupilConfig.range = 30;
		} else {
			pupilConfig.start = -30;
			pupilConfig.range = 60;
		}
	};

	updatePupilSettings();

	const config = {
		x: {
			start: 0,
			end: window.innerWidth,
			currentPosition: 0,
			value: 0,
			getRange() {
				return this.end - this.start;
			}
		},
		y: {
			end: window.innerHeight,
			currentPosition: 0,
			value: 0
		}
	};

	const mouseMove = (event) => {
		config.x.currentPosition = event.clientX - config.x.start;
		config.x.value = config.x.currentPosition / config.x.getRange();

		config.y.currentPosition = event.clientY;
		config.y.value = config.y.currentPosition / config.y.end;

		const pupilCurrentX =
			pupilConfig.start + config.x.value * pupilConfig.range;
		const pupilCurrentY =
			pupilConfig.start + config.y.value * pupilConfig.range;

		pupils.forEach((current) => {
			current.style.transform = `translate(${pupilCurrentX}px, ${pupilCurrentY}px)`;
		});
	};

	const windowResize = () => {
		updatePupilSettings();
		config.x.end = window.innerWidth;
		config.y.end = window.innerHeight;
	};

	window.addEventListener("mousemove", mouseMove);
	window.addEventListener("resize", debounce(windowResize, 200));
})();
