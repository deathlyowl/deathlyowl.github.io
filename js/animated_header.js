/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpAnimatedHeader = (function() {

	var docElem = document.documentElement,
		header = document.querySelector( '.header' ),
		logo = document.querySelector( '.logo' ),
		who = document.querySelector( 'nav a:nth-child(4)' ),
		what = document.querySelector( 'nav a:nth-child(3)' ),
		where = document.querySelector( 'nav a:nth-child(2)' ),
		didScroll = false,
		first = 512,
		second = 1200,
		changeHeaderOn = 512;

	function init() {
		menu();
		window.addEventListener( 'scroll', function( event ) {
			if( !didScroll ) {
				didScroll = true;
				scrollPage();
				//setTimeout( scrollPage, 125 );
			}
		}, false );
		
		window.addEventListener( 'scroll', function( event ) {
			menu();
		}, false );
	}

	function scrollPage() {
		var sy = scrollY();
		if ( sy >= changeHeaderOn ) {
			classie.add( header, 'header_small' );
			classie.add( logo, 'logo_small' );
		}
		else {
			classie.remove( header, 'header_small' );
			classie.remove( logo, 'logo_small' );
		}
		
		didScroll = false;
	}

	function scrollY() {
		return window.pageYOffset || docElem.scrollTop;
	}
	
	function menu() {
		var sy = scrollY();
		if (sy <= first){
			classie.add( who, 'active' );
			classie.remove( what, 'active' );
			classie.remove( where, 'active' );
		}
		else if (sy <= second){
			classie.remove( who, 'active' );
			classie.add( what, 'active' );
			classie.remove( where, 'active' );
		}
		else {
			classie.remove( who, 'active' );
			classie.remove( what, 'active' );
			classie.add( where, 'active' );
		}
	}

	init();

})();