(function( window, undefined ){
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
        document.getElementById("instructions").innerHTML = "Not supported";
    }
    
    function deviceMotionHandler(eventData) {
        // Grab the acceleration including gravity from the results
        var acceleration = eventData.accelerationIncludingGravity;
        
        // Display the raw acceleration data
        var rawAcceleration = "[" +  Math.round(acceleration.x) + ", " + 
        Math.round(acceleration.y) + ", " + Math.round(acceleration.z) + "]";
        
        // Z is the acceleration in the Z axis, and if the device is facing up or down
        var facingUp = -1;
        if (acceleration.z > 0) {
            facingUp = +1;
        }
        
        // Convert the value from acceleration to degrees acceleration.x|y is the 
        // acceleration according to gravity, we'll assume we're on Earth and divide 
        // by 9.81 (earth gravity) to get a percentage value, and then multiply that 
        // by 90 to convert to degrees.                                
        var tiltLR = Math.round(((acceleration.x) / 9.81) * -90),
            tiltFB = Math.round(((acceleration.y + 9.81) / 9.81) * 90 * facingUp);
        
        // Display the acceleration and calculated values
        //document.getElementById("moAccel").innerHTML = rawAcceleration;
        //document.getElementById("moCalcTiltLR").innerHTML = tiltLR;
        //document.getElementById("moCalcTiltFB").innerHTML = tiltFB;
        
        // Apply the 2D rotation and 3D rotation to the image
        //var rotation = "rotate(" + tiltLR + "deg) rotate3d(1,0,0, " + (tiltFB) + "deg)";
        //document.getElementById("imgLogo").style.webkitTransform = rotation;

	var oReq = new XMLHttpRequest();
	oReq.open("get", "position/set.php?" + window.location.search.match( /client\-id=([0-9]+)/i ).pop() + "&x=" + tiltFB + "&y=0&z=" + tiltLR, true);
	oReq.send();
    }

})( window );