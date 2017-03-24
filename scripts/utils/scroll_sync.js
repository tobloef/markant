// Logic for syncing the scrollbars of the editor and the viewer panes.
;(function() {
	const $ = require("jquery");

	// Sync the scroll of a number of divs
	function sync($sender, $master, $masters, isManual) {
		if ($sender.is(":hover") || isManual) {
			const master = $master.get(0);
			const percentage = master.scrollTop / (master.scrollHeight - master.offsetHeight);
			$masters.not($master).each(function(i, other) {
				other.scrollTop = percentage * (other.scrollHeight - other.offsetHeight);
			});
		}
	}

	// Link the scrolling of a number of elements.
	// The function takes an array of objects with the following structure:
	// {
	//     $master,
	//     $extraEventTriggeres,
	// }
	// The master div is the jQuery object of the element that you want to link.
	// The extra event triggeres is a jQuery object of elements whose scroll events
	// should be treated like the master element's scroll event. This is used to handle
	// elements with external scrollbar element and so on.
	function link(things) {
		if (!things) {
			return;
		}
		let $masters = $();
		for (let i = 0; i < things.length; i++) {
			if (!things[i] || !things[i].$master) {
				continue;
			}
			$masters = $masters.add(things[i].$master);
		}
		for (let i = 0; i < things.length; i++) {
			if (!things[i] || !things[i].$master) {
				continue;
			}
			let $eventTriggeres;
			if (!things[i].$extraEventTriggeres) {
				$eventTriggeres = things[i].$master;
			} else {
				$eventTriggeres = things[i].$master.add(things[i].$extraEventTriggeres);
			}
			$eventTriggeres.on("scroll", function(event) {
				sync($(event.currentTarget), things[i].$master, $masters);
			});
		}
	}

	module.exports = {
		link,
		sync,
	};
}());
