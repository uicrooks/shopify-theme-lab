export default function unescape(value) {
	const doc = new DOMParser().parseFromString(value, "text/html");

	return doc.body.innerHTML;
}
