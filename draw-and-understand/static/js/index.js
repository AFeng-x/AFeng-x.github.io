window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  var wrapper = document.getElementById('interpolation-image-wrapper');
  if (wrapper) {
    wrapper.replaceChildren(image);
  }
}


document.addEventListener('DOMContentLoaded', function() {
    // Check for click events on the navbar burger icon
    document.querySelectorAll('.navbar-burger').forEach(function(burger) {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      burger.addEventListener('click', function() {
        document.querySelectorAll('.navbar-burger').forEach(function(item) {
          item.classList.toggle('is-active');
        });
        document.querySelectorAll('.navbar-menu').forEach(function(item) {
          item.classList.toggle('is-active');
        });
      });
    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', function() {});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function() {});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    var interpolationSlider = document.getElementById('interpolation-slider');
    var interpolationWrapper = document.getElementById('interpolation-image-wrapper');
    if (interpolationSlider && interpolationWrapper) {
      preloadInterpolationImages();

      interpolationSlider.addEventListener('input', function(event) {
        setInterpolationImage(this.value);
      });
      setInterpolationImage(0);
      interpolationSlider.max = NUM_INTERP_FRAMES - 1;
    }

    bulmaSlider.attach();

});
