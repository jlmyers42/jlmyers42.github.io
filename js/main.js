jQuery(document).ready(function($) {

// Some important measurements that I'll use for later UI functions
    conHeight = Math.round($(window).height());
    navHeight = Math.round($('#navbar header').height());
    footerHeight = Math.round($('.footer-container footer').height());

// Let's stretch our content sections to fit the window and make sure we jump to top of page
    function conWinSize(){
        // apply css min-sizing to centering div based on window sizing
        $('#splash').css('height',( conHeight + 'px'));
        $('#splashmap').css('height',( conHeight + 'px'));
        // stretch the padding on the contact container to make way for docked navbar
        // this goes here because you never scroll up to it the way you do with the main-container
        $('.contact-container').css('padding-top', (navHeight));
		$('html, body').animate({ scrollTop: 0 }, 0);
    // end setSizes
    };
    // now run it
    conWinSize();

// The Google Map

    function initializeMap() {
        var layer = "watercolor";
        var myPlaces = [
            ['<p><strong>Melrose &raquo;</strong> Where I Live</p>', new google.maps.LatLng(42.458, -71.066)],
            ['<p><strong>Caledonia &raquo;</strong> Where I Grew Up</p>', new google.maps.LatLng(42.84, -85.5)],
            ['<p><strong>Chicago &raquo;</strong> Hometown (2001-2009)</p>', new google.maps.LatLng(41.79384, -87.6)],
            // europe 
            ['<p><strong>Paris &raquo;</strong> Honeymooning.</p>', new google.maps.LatLng(48.848401, 2.358767)],
            ['<p><strong>Cullera &raquo;</strong> Honeymooning.</p>', new google.maps.LatLng(39.164071, -0.255884)],
            ['<p><strong>Barcelona &raquo;</strong> Backpacking Europe.</p>', new google.maps.LatLng(41.402902, 2.157351)],
            ['<p><strong>Edinburgh &raquo;</strong> Backpacking Europe.</p>', new google.maps.LatLng(55.962008, -3.208840)],
            ['<p><strong>Dublin &raquo;</strong> Backpacking Europe.</p>', new google.maps.LatLng(53.370761, -6.252053)],
            ['<p><strong>Rome &raquo;</strong> Backpacking Europe.</p>', new google.maps.LatLng(41.871990, 12.480380)],
            ['<p><strong>Prague &raquo;</strong> Backpacking Europe.</p>', new google.maps.LatLng(50.076198, 14.431978)],                        
            ['<p><strong>London &raquo;</strong> Yay, college! I had a month in London to study journalism.</p>', new google.maps.LatLng(51.506744, -0.165285)],
            // india and nepal
            ['<p><strong>Mumbai &raquo;</strong> I lived in Kings Circle in 2006.</p>', new google.maps.LatLng(19, 72.845)],
            ['<p><strong>Delhi &raquo;</strong> My Current Location</p>', new google.maps.LatLng(28.576408, 77.259464)],
            ['<p><strong>Annapurna &raquo;</strong> I biked the Himalayans in November.</p>', new google.maps.LatLng(28.789526, 83.734465)],
            ['<p><strong>Hampi &raquo;</strong> Boulder mountains. Musical ruins. Hanuman.</p>', new google.maps.LatLng(15.331265, 76.460138)],
            ['<p><strong>Darjeeling &raquo;</strong> I did a story on Makaibari tea here.</p>', new google.maps.LatLng(26.861503, 88.261242)],
            ['<p><strong>Taj Mahal &raquo;</strong> Despite the touts, I have visited 4 times.</p>', new google.maps.LatLng(27.174867, 78.042155)],
            ['<p><strong>Kolkata &raquo;</strong> Bengali literati. Colonial architecture. Students galore.</p>', new google.maps.LatLng(22.564805, 88.369960)],
            ['<p><strong>Goa &raquo;</strong> Beaches and motorbike rides through Panjim.</p>', new google.maps.LatLng(15.498792, 73.830909)],
            ['<p><strong>Kochi &raquo;</strong> Paradesi Synagogue. Fishing nets. Peace.</p>', new google.maps.LatLng(9.931089, 76.266571)]
        ];
        var map = new google.maps.Map(document.getElementById("splashmap"), {
            center: new google.maps.LatLng(22.564805, 88.369960),
            // center: new google.maps.LatLng(42.458, -71.066),
            zoom: 6,
            panControl: false,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            overviewMapControl: false,
            mapTypeId: layer,
            mapTypeControlOptions: {
                mapTypeIds: [layer]
            }
        });
        // add stamen watercolor layer
        // temporarily remove stamen layer
          // map.mapTypes.set(layer, new google.maps.StamenMapType(layer));
        // add my labels with InfoBox
        for (var i = 0; i < myPlaces.length; i++) {
            var theOptions = {
                content: myPlaces[i][0],
                disableAutoPan: true,
                position: myPlaces[i][1],
                closeBoxURL: "",
                pane: "mapPane",
                enableEventPropagation: true
            };
            var addLabel = new InfoBox(theOptions);
            addLabel.open(map);
        }
    }
    // Run it
    google.maps.event.addDomListener(window, 'load', initializeMap);


// Make sure scrolling is smooth
	$(function() {
	  $('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
			|| location.hostname == this.hostname) {
	
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		  if (target.length) {
			$('html,body').animate({
			  scrollTop: target.offset().top
			}, 500);
			return false;
		  }
		}
	  });
	});
	
// Doc the navbar at top once we've passed it in height
	var navbarChecker = 0;
	$(window).scroll(function() {
	  	// first, keep up with y position
		var yPos = $(window).scrollTop();
		if (( navbarChecker === 0 ) && ( yPos >= (conHeight) )) {
			// dock the navbar and add some padding to the section headers
			$('#navbar').addClass( 'docked' );
			$('.main-container').css('padding-top', (navHeight));
			navbarChecker = 1;
		}
		if (( navbarChecker === 1 ) && ( yPos < (conHeight) )) {
			// undock and remove section padding
			$('#navbar').removeClass( 'docked' );
			$('.main-container').css('padding-top', (0));
			navbarChecker = 0;
		} 
	});

// Let user close the about blurb to interact with the map
	var uparrow = "&#8743;"
    var downarrow = "&#8744;"
    var keeptrack = true;
    $('#infotoggle').click(function(){
			$('#about p').toggle();
            if (keeptrack == true) {
                $('#about h1 span').html(downarrow);
                keeptrack = false;
            } else {
                $('#about h1 span').html(uparrow);
                keeptrack = true;
            }
		});

// Have to unhide labels in contact form for IE :(
// Thanks to Aleksey Kolesnik on StackExchange
	var gotPlaceholder = {};
	// Create the input element for various Web Forms feature tests.
	var inputElem = document.createElement('input'), attrs = {};    
	gotPlaceholder.input = (function(props) {
		for (var i = 0, len = props.length; i < len; i++) {
			attrs[props[i]] = props[i] in inputElem;
		}
		return attrs;
	})('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
	
	if(!gotPlaceholder.input.placeholder) {
		$('.contact-container label').removeClass( 'visuallyhidden' ); 
	}		

//end page ready
});