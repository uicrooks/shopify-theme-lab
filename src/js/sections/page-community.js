// Form Builder with File Upload Community (Code insert in to form app)
function addToPlaceholder(toAdd, el) {
	el.placeholder = el.placeholder + toAdd;

	return new Promise((resolve) => setTimeout(resolve, 100));
}

function clearPlaceholder(el) {
	el.placeholder = "";
}

function printPhrase(phrase, el) {
	return new Promise((resolve) => {
		clearPlaceholder(el);
		let letters = phrase.split("");

		letters.reduce(
			(promise, letter, index) =>
				promise.then(() => {
					if (index === letters.length - 1) {
						setTimeout(resolve, 1000);
					}
					return addToPlaceholder(letter, el);
				}),
			Promise.resolve()
		);
	});
}

function printPhrases(phrases, el) {
	phrases.reduce(
		(promise, phrase) => promise.then(() => printPhrase(phrase, el)),
		Promise.resolve()
	);
}

const textareaPlaceholders = [
	"Hier ist Platz für deine Kreativität*",
	"Hier ist Platz für deine Kreativität*",
	"Hier ist Platz für deine Kreativität*"
];

printPhrases(textareaPlaceholders, document.querySelector("#form_input_0"));
