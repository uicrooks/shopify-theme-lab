export const debounce = (fn, ms = 0) => {
	let timeoutId;
	return function (...args) {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(() => fn.apply(this, args), ms);
	};
};

export const getRandomBetween = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};
