// For adding rules to an existing <style> tag.
;(function() {
	const $ = require("jquery");

	function append(id, css) {
		const $element = $(`#${id}`);
		if ($element) {
			const $parent = $element.parent();
			const oldCSS = $element.html();
			$element.remove();
			$(`<style type='text/css' id='${id}'>${oldCSS}\n${css}</style>`).appendTo("head");
		}
	}

	module.exports = {
		append
	};
}());
