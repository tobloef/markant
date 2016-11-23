;(function() {
	const $ = require("jquery");

	// Takes a jQuery object of divs and links their scrolling.
	function link($divs) {
		$divs.on("scroll", function(event) {
			sync($(event.currentTarget), $divs);
		});
	}

	// Sync the scroll of a number of divs
	function sync($sender, $divs, isManual) {
		if ($sender.is(":hover") || isManual) {
			const sender = $sender.get(0);
			const percentage = sender.scrollTop / (sender.scrollHeight - sender.offsetHeight);
			$divs.not($sender).each(function(i, other) {
				other.scrollTop = percentage * (other.scrollHeight - other.offsetHeight);
			});
		}
	}

	module.exports = {
		link,
		sync
	};
}());
