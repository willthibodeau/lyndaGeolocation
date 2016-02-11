// JavaScript Document

// Determines compass direction name, i.e., N, NW, S, etc.
function headingToText(h) {
    var t;
    if (typeof h !== "number") {
        t = ''; 
    } else if (h >= 337.5 || (h >= 0 &&  h <= 22.5)) {
        t =  'N'; 
    } else if (h >= 22.5 && h <= 67.5) {
        t =  'NE'; 
    } else if (h >= 67.5 && h <= 112.5) {
        t =  'E'; 
    } else if (h >= 112.5 && h <= 157.5) {
        t =  'SE'; 
    } else if (h >= 157.5 && h <= 202.5) {
        t =  'S'; 
    } else if (h >= 202.5 && h <= 247.5) {
        t =  'SW'; 
    } else if (h >= 247.5 && h <= 292.5) {
        t =  'W'; 
    } else if (h >= 292.5 && h <= 337.5) {
        t =  'NW'; 
    } else {
        t =  t;
    }
    return t;
}

// xui method of initializing; "deviceready" is a PhoneGap function
x$(document).on("deviceready", function () {
    //Sets view to the overall compass container selector
	var view = x$("#compass .container"),
        lastHeading;

    // Function called by PhoneGap compass object if connection was successful
	function success(heading) {
		// Sets needle to needle selector and info to heading selector
        var needle = x$("#compass .needle"),
            info = x$("#compass .heading");

        // if unchanged, return
		if (lastHeading === heading) return;
        // otherwise, reset lastHeading
		lastHeading = heading;

        // Update CSS for moving needle
		needle.css({
            "-webkit-transform": "rotate(-" + heading + "deg)",
            "transform": "rotate(-" + heading + "deg)"
        });

        // Writes heading info. &#xbo; is character entity for degree sign
		info.html(heading + "&#xb0; (" + headingToText(heading) + ")");
    }

    // Function called by PhoneGap compass object if connection was not successful
    function fail() {
        view.html("Error!");
    }

    // PhoneGap API call to compass direction in degrees 
	navigator.compass.getCurrentHeading(success, fail);
    // PhoneGap API call to get compass direction at specified intervals
	navigator.compass.watchHeading(success, fail, {frequency: 100});
});

