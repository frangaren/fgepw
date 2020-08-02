let lastRatio = 1;
const intersectionObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			const ratio = entry.intersectionRatio;
			if (ratio > lastRatio && ratio > 0.6) {
				entry.target.classList.remove('faded_out');
				entry.target.classList.add('faded_in');
			} else if (ratio < lastRatio && ratio < 0.7) {
				entry.target.classList.remove('faded_in');
				entry.target.classList.add('faded_out');
			}
			lastRatio = ratio;
		});
	},
	{
		threshold: [0.6, 0.7],
	},
);

intersectionObserver.observe(document.querySelector('.splash_content'));
