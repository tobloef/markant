;(function() {
	const $ = require("jquery");

	const idFunctionMap = {
		"edit-preferences": showSettingsModal,
		"edit-undo": undo,
		"edit-redo": redo,
	};

	function showSettingsModal() {
		$("#settings-modal").addClass("active");
	}

	function undo() {

	}

	function redo() {

	}

	function closeDropdowns() {
		$(".navbar-dropdown .dropdown-content").hide();
	}

	module.exports = function() {
		const $links = $(".navbar a");

		$links.on("click", function(event) {
			const id = $(this).attr("id");
			if (id in idFunctionMap) {
				idFunctionMap[id]($(this));
				closeDropdowns();
				event.preventDefault();
			}
		});

		$(document).click(function(event) {
			closeDropdowns();
			const $navbarDropdown = $(event.target).parent(".navbar-dropdown");
			if ($navbarDropdown.length !== 0) {
				$navbarDropdown.find(".dropdown-content").show();
			}
		});
	};
}());