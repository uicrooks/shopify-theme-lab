export default (function () {
	const themeTemplateMeta = document.querySelector(
		'[property="theme:template"]'
	);
	if (!themeTemplateMeta) {
		return {};
	}

	const templateString = themeTemplateMeta.content;

	const regex =
		/(?<template>((?<directory>[a-zA-Z0-9_-]+)\/)?(?<name>[a-zA-Z0-9_-]+)\.?(?<suffix>[a-zA-Z0-9_-]+)?)(.+)?/;

	const { template, directory, name, suffix } =
		regex.exec(templateString).groups;

	let result = {
		template,
		directory,
		name,
		suffix,
		layout: null
	};

	const themeLayoutMeta = document.querySelector('[property="theme:layout"]');
	if (themeLayoutMeta) {
		result = {
			...result,
			layout: themeLayoutMeta.content
		};
	}

	return result;
})();
