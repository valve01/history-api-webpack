import * as $ from "jquery";

function createAnalytics() {
	let counter = 0;
	let isDestoyed = false;

	const listener = () => {
		counter++;
	};

	$(document).on("click", listener);

	return {
		destroy() {
			$(document).off("click", listener);
			isDestoyed = true;
		},
		getClicks() {
			if (isDestoyed) {
				return `Analytics is destroyed. Total clicks=${counter}`;
			}
			return counter;
		},
	};
}

window.analytics = createAnalytics();
