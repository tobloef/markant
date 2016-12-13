;(function() {
	const $ = require("jquery");

	const idFunctionMap = {
		"edit-settings": showSettingsModal
	};

	function showSettingsModal() {
		$("#settings-modal").addClass("active");
	}

	module.exports = function() {
		const $links = $(".navbar a");

		$links.on("click", function(event) {
			const id = $(this).attr("id");
			if (id in idFunctionMap) {
				idFunctionMap[id]();
				event.preventDefault();
			}
		});
	};
}());