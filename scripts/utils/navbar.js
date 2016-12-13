;(function() {
	const $ = require("jquery");

	const idFunctionMap = {
		"edit-settings": showSettingsModal
	};

	function showSettingsModal() {
		$("#settings-modal").addClass("active");
	}

	module.exports = function() {
		const $dropdownLinks = $(".dropdown-content a");
		const $dropdowns = $(".navbar-dropdown");

		$dropdowns.on("mouseover", function() {
			$(this).addClass("active");
		});

		$dropdowns.on("mouseleave", function() {
			$(this).removeClass("active");
		});

		$dropdownLinks.on("click", function() {
			const id = $(this).attr("id");
			if (id in idFunctionMap) {
				idFunctionMap[id]();
			}
			$(this).closest(".navbar-dropdown").removeClass("active");;
		});
	};
}());