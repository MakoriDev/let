

	// Get the text element
	const textElement = document.querySelector('.block h1');
	// Get the text content
	const text = textElement.textContent;
	// Clear the text content
	textElement.textContent = '';

	let index = 0;
	const typingSpeed = 250; // Adjust typing speed (in milliseconds) here

	function typeText() {
		if (index < text.length) {
			// Append next character to the text content
			textElement.textContent += text.charAt(index);
			index++;
			setTimeout(typeText, typingSpeed);
		}
	}

	// Call the typing function
	typeText();



(function ($) {
  "use strict";

  $(document).ready(function() {
    // Smooth scrolling for internal links
    $('a[href^="#"]').on('click', function(event) {
      event.preventDefault();
      var target = $(this.getAttribute('href'));
      if (target.length) {
        scrollTo(target.offset().top);
      }
    });
  });

  // Smooth scrolling function with debounce
  var scrolling = false;
  function scrollTo(targetPosition) {
    if (!scrolling) {
      scrolling = true;
      $('html, body').stop().animate({
        scrollTop: targetPosition
      }, 800, function() {
        scrolling = false;
      });
    }
  }

  // Rest of the script...

  $(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });
  if ($(window).width() < 1024) {
    $(".navbar-menu .has-dropdown").on("click", function (e) {
      $(this).children(".navbar-dropdown").toggle();
    });
  }

  $(".videoplay").modalVideo();
  $(".portfolio-single-slider").slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  $(".clients-logo").slick({
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
  });

  $(".testimonial-wrap").slick({
    slidesToShow: 2,
    slidesToScroll: 2,
    infinite: true,
    dots: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 6000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  $(".gallery-wrap").each(function () {
    $(this)
      .find(".gallery-popup")
      .magnificPopup({
        type: "image",
        gallery: {
          enabled: true,
        },
      });
  });

  var map;

  function initialize() {
    var mapOptions = {
      zoom: 13,
      center: new google.maps.LatLng(50.97797382271958, -114.107718560791),
      // styles: style_array_here
    };
    map = new google.maps.Map(
      document.getElementById("map-canvas"),
      mapOptions
    );
  }

  var google_map_canvas = $("#map-canvas");

  if (google_map_canvas.length) {
    google.maps.event.addDomListener(window, "load", initialize);
  }

  // Counter

  $(".counter-stat").counterUp({
    delay: 10,
    time: 1000,
  });
})(jQuery);



