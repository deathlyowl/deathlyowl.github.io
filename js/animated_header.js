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
		who = document.querySelector( 'nav a:nth-child(5)' ),
		what = document.querySelector( 'nav a:nth-child(4)' ),
		where = document.querySelector( 'nav a:nth-child(3)' ),
		how = document.querySelector( 'nav a:nth-child(2)' ),
		owl = document.querySelector( '#who' )
		didScroll = false,
		first = 512,
		second = 2250,
		third = 3500,
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
		
		/*
	    window.addEventListener('mousemove', function( event ) {
	        //alert('mouse');
			percX =  Math.floor(100 * event.pageX / screen.width);
			percY =  Math.floor(100 * event.pageY / screen.height);
			x = 100+(50-percX)/20;
			y = 50-(50-percY)/20;
			
			//alert(percX+'% '+percY+'%');
			owl.setAttribute("style","background-position: "+ x +"% "+y+"%;");
			
		}, false);
		*/
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
			classie.remove( how, 'active' );
		}
		else if (sy <= second){
			classie.remove( who, 'active' );
			classie.add( what, 'active' );
			classie.remove( where, 'active' );
			classie.remove( how, 'active' );
		}
		else if (sy <= third){
			classie.remove( who, 'active' );
			classie.remove( what, 'active' );
			classie.add( where, 'active' );
			classie.remove( how, 'active' );
		}
		else {
			classie.remove( who, 'active' );
			classie.remove( what, 'active' );
			classie.remove( where, 'active' );
			classie.add( how, 'active' );
		}
			y = 50-(sy/5);
			//alert(percX+'% '+percY+'%');
			owl.setAttribute("style","background-position: 100% "+y+"%;");
	
		if (sy + screen.height/2 < first)
		{
			classie.add( document.querySelector( '#what' ), 'hidden' );
		}
		else
		{
			classie.remove( document.querySelector( '#what' ), 'hidden' );
		}
	
			
		if (sy + screen.height/2 < second)
		{
			classie.add( document.querySelector( '#where' ), 'hidden' );
		}
		else
		{
			classie.remove( document.querySelector( '#where' ), 'hidden' );
		}
		
	
			
		if (sy + screen.height/2 < third)
		{
			classie.add( document.querySelector( '#how' ), 'hidden' );
		}
		else
		{
			classie.remove( document.querySelector( '#how' ), 'hidden' );
		}
	}

	init();

})();