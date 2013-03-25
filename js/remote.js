if (window.DeviceOrientationEvent) {
  // Listen for the deviceorientation event and handle the raw data
  window.addEventListener('deviceorientation', function(eventData) {
    // gamma is the left-to-right tilt in degrees, where right is positive
    var tiltLR = eventData.gamma;

    // beta is the front-to-back tilt in degrees, where front is positive
    var tiltFB = eventData.beta;

    // alpha is the compass direction the device is facing in degrees
    var dir = eventData.alpha

    // deviceorientation does not provide this data
    var motUD = null;

    // call our orientation event handler
    deviceOrientationHandler(tiltLR, tiltFB, dir, motUD);
  }, false);
} else if (window.OrientationEvent) {
  window.addEventListener('MozOrientation', function(eventData) {
    // x is the left-to-right tilt from -1 to +1, so we need to convert to degrees
    var tiltLR = eventData.x * 90;

    // y is the front-to-back tilt from -1 to +1, so we need to convert to degrees
    // We also need to invert the value so tilting the device towards us (forward) 
    // results in a positive value. 
    var tiltFB = eventData.y * -90;

    // MozOrientation does not provide this data
    var dir = null;

    // z is the vertical acceleration of the device
    var motUD = eventData.z;
    
    // call our orientation event handler
    deviceOrientationHandler(tiltLR, tiltFB, dir, motUD);
  }, false);
}

function deviceOrientationHandler( tiltLR, tiltFB ) {
	tiltLR = -tiltLR;
	//tiltFB = -tiltFB;
	var oReq = new XMLHttpRequest();
	oReq.open("get", "position/set.php?" + window.location.search.match( /client\-id=(?:[0-9]+)/i ).pop() + "&x=" + tiltFB + "&y=0&z=" + tiltLR, true);
	oReq.send();
}
