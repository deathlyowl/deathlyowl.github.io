var pagesCount = 8;
var direction = 0;
var appColors = new Array( "#F4515D", "#FCA23C", "#FFCF41", "#0097FD" );

var colors = new Array( "#FF3B30", "#FFCC00", "#4CD964", "#34AADC",
						"#007AFF", "#5856D6", "#FF2D55", "#E0F8D8",
						"#D1EEFC", "#C7C7CC", "#8E8E93", "#FF4981",
						"#FF3A2D", "#BDBEC2", "#1F1F21", "#FF1300",
						"#F7F7F7", "#FFD3E0" );

var parameters = [
// [00] bars
// [01] lines
// [02] labels
// [03] hand
// [04] background
// [05] screen
// [06] logo
// [07] left
// [08] right
// [09] textcolor
// [10] indicator
// [11] indicator image
// [12] left subtext
// [13] left subtext


  [0, 0, 0, 0, appColors[0], appColors[0], 1, "Słońce", "", "white", 0, "", "It means <em>Sun</em> in polish.<br>We are polish.", ""],
  [0, 0, 0, 0, colors[16], appColors[0], 1, "Słońce", "the app", appColors[0], 0, "", "", ""],
  [0, 0, 1, 1, appColors[3], appColors[3], 0, "Słońce", "the clock", colors[16], 0, "", "", "This white line is the <strong>hand</strong> of it."],
	[2, 1, 1, 1, appColors[3], appColors[3], 0, "Słońce", "the sundial", colors[16] ,0 , "", "", "We know what we are doing.<br> We are polish engineers. <br>We are using GPS."],
	[2, 0, 0, 0, appColors[3], appColors[3], 0, "<span style=\"color: rgba(1,1,1,.2);\">night</span>", "<span style=\"color: rgba(1,1,1,.1);\">twillight*</span>", colors[16], 0, "", "you know, when it's dark and stars are above your head", "it's when there is some light but the sun is <strong>invisible</strong>. <br><span style=\"color: rgba(1,1,1,.2);\">*<em>(not the motion picture)</em></span>"],
	[1, 0, 0, 0, appColors[3], appColors[3], 0, "civil", "twillight", colors[16], 1, "url('civil.png')", "", "When the sun is 6 degrees below the horizon."],
  [2, 0, 0, 0, appColors[3], appColors[3], 0, "navigational", "twillight", colors[16],1, "url('navis.png')", "", "When there is enough sunlight for the horizon to be distinguishable."],
  [3, 0, 0, 0, appColors[3], appColors[3], 0, "astronomical", "twillight", colors[16],1, "url('astro.png')", "", "When you cannot observe stars."],

  
  [0, 0, 0, 0, appColors[0], appColors[0], 1, "Słońce", "", "white", 0, "", "It's colorful. It's moving.", "<em>Da pinążka</em>."]
];

var page = 0;
var pageHeight = 700;

var heightWithMinutes = function(minutes) {
	return minutes / 1440 * 568;
}

var moveHand = function() {
	var myDate = new Date();
	seconds = myDate.getSeconds();
	minutes = myDate.getMinutes() + 60 * myDate.getHours();
	
	handWidth = seconds / 58 * 320;
	handPosition = heightWithMinutes(minutes);
	
	if(seconds == 0 || seconds == 59){
		$('#ticker').css("opacity", 0);	
	}
	else{
		$('#ticker').css("opacity", 1);
	}
	$('#ticker').css("width", handWidth);
	$('#hand').css("top", handPosition);
	
	minutesS = myDate.getMinutes();
	secondsS = myDate.getSeconds();
	
	if(minutesS< 10) minutesS = "0" + minutesS;
	if(secondsS< 10) secondsS = "0" + secondsS;
	
	
	//$('#subtext').text("it's " + myDate.getHours() + ':' + minutesS + ':' + secondsS);
};

var enableAnimations = function() {
	$('.screen').css("-webkit-transition", ".75s ease-in");
	$('#ticker').css("-webkit-transition", ".75s ease-in");
	$('#hand').css("-webkit-transition", ".75s ease-in");
	$('#ticker').css("-moz-transition", ".75s ease-in");
	$('#hand').css("-moz-transition", ".75s ease-in");
}

var setPagesize = function() {
	hght = pageHeight;
	$('.page').css("height", hght);
}

var setBars = function(calculations, mode) {
	
	dawnIndex = mode;
	
	sunset = new Date(epochFromJulian(calculations[0]) * 1000);
	sunrise = new Date(epochFromJulian(calculations[1]) * 1000);
	dawn =  new Date(epochFromJulian(calculations[0 + mode*2]) * 1000);
	dusk =  new Date(epochFromJulian(calculations[1 + mode*2]) * 1000);
	
	sunsetHeight = heightWithMinutes(	sunset.getMinutes() + 
										sunset.getHours() * 60);

	duskHeight = heightWithMinutes(	dawn.getMinutes() + 
									dawn.getHours() * 60);
									
	twillightSpace = heightWithMinutes((sunrise.getMinutes() + 
										sunrise.getHours() * 60) -
									   (sunset.getMinutes() + 
										sunset.getHours() * 60));
	
	nightSpace = heightWithMinutes((dusk.getMinutes() + 
									dusk.getHours() * 60) -
								   (dawn.getMinutes() + 
									dawn.getHours() * 60));
									
	if(mode == 0){
		sunsetHeight = duskHeight = 0;
		twillightSpace = nightSpace = 568;
	}

	$('#pretwillight').css("height", sunsetHeight);
	$('#prenight').css("height", duskHeight);

	$('#twillightspace').css("height", twillightSpace);
	$('#nightspace').css("height", nightSpace);
}

$(document.documentElement).keyup(function (event) {
  // handle cursor keys
  if (event.keyCode == 38) {
	  page--;
    // go left
  } else if (event.keyCode == 40) {
    // go right
	page++;
  }
  

if(page < 0) page = 0;
if(page > pagesCount) page = pagesCount;

setPage(page);
});

$( window ).scroll(function() {
	scrollTop = $(window).scrollTop();
	if(scrollTop > 0 && !direction) direction = 1;
	if(scrollTop < 0 && !direction) direction = -1;
	if(scrollTop == 0)
	{
		page = page + direction;
	
		if(page < 0) page = 0;
		if(page > pagesCount) page = pagesCount;
		
		setPage(page);
		direction = 0;
	}
});

$( window ).resize(function() {
	setPagesize();
});

