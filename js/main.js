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