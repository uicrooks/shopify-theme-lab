(function () {
	/*
	 *
	 *	Lazy load images script with CACHE check.
	 *	If images in cache - lazy load would not start.
	 *
	 *	If you don't need a feature with caches image - comment code.
	 *
	 *	HTML basic structure
	 *	<picture class="lazy">
	 *		<source data-srcset="img-src-for-1x-screen 1x, img-src-for-2x-screen 2x" >
	 *		<img src="img-src-thumbnail-40x-resolution" data-srcset="img-src-default-resolution" srcset="img-src-thumbnail-40x-resolution" alt="">
	 *	</picture>
	 */

	document.addEventListener("DOMContentLoaded", function () {
		if (window.caches) {
			let lazyImages = [].slice.call(
				document.querySelectorAll(".lazy [data-srcset]")
			);

			Promise.all(
				lazyImages.map((img) => {
					const src = img.getAttribute("data-srcset");

					return window.caches.match(src).then((response) => {
						if (response) {
							img.setAttribute("srcset", src);
							img.removeAttribute("data-srcset");
							img.parentElement.classList.remove("lazy");
						}
					});
				})
			).then(lazyLoadPictures);
		} else {
			lazyLoadPictures();
		}

		function lazyLoadPictures() {
			let lazyImages = [].slice.call(
				document.querySelectorAll(".lazy [data-srcset]")
			);

			if (lazyImages.length < 1) {
				return;
			}

			if ("IntersectionObserver" in window) {
				let lazyImageObserver = new IntersectionObserver(function (entries) {
					entries.forEach(function (entry) {
						if (entry.isIntersecting) {
							let lazyImage = entry.target;
							lazyImage.srcset = lazyImage.dataset.srcset;

							caches.open("images").then(function (cache) {
								cache.addAll([lazyImage.dataset.srcset]).then(function () {});
							});

							lazyImage.parentElement.classList.remove("lazy");
							lazyImageObserver.unobserve(lazyImage);
						}
					});
				});

				lazyImages.forEach(function (lazyImage) {
					lazyImageObserver.observe(lazyImage);
				});
			} else {
				// Not supported, load all images immediately
				lazyImages.forEach(function (image) {
					image.srcset = image.dataset.srcset;
				});
			}
		}
	});
})();
