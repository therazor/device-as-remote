// requestAnimationFrame polyfill
/*(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame =
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());*/
(function( window, undefined ){
    // set the scene size
	var WIDTH = 400,
        HEIGHT = 300;

	// set some camera attributes
	var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

	// get the DOM element to attach to
	// - assume we've got jQuery to hand
	var stage = document.querySelectorAll('#stage')[0];

	// create a WebGL renderer, camera
	// and a scene
	var renderer = new THREE.WebGLRenderer({
        antialias: true
	});
	var camera = new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    );
	var scene = new THREE.Scene();

	// the camera starts at 0,0,0 so pull it back
	camera.position.z = 300;

	// start the renderer
	renderer.setSize(WIDTH, HEIGHT);

	// attach the render-supplied DOM element
	stage.appendChild(renderer.domElement);

	// create the puppet's material
	var material = new THREE.MeshLambertMaterial(
	{
        color: 0xCC0000
	});

	// set up the puppet vars
	// var radius = 50, segments = 16, rings = 16;

	// create a new mesh with puppet geometry -
	// we will cover the material next!
	var puppet = new THREE.Mesh(
        new THREE.CubeGeometry( 100, 100, 100 ),
        material
    );

	// add the puppet to the scene
	scene.add(puppet);

	// and the camera
	scene.add(camera);

	// create a point light
	var pointLight = new THREE.PointLight( 0xFFFFFF );

	// set its position
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

	// add to the scene
	scene.add(pointLight);

    puppet.rotation.x += 0.5;
    puppet.rotation.y += 0.5;
    //puppet.rotation.z += 0.5;
    
	// draw!
    function draw() {
        renderer.render(scene, camera);
        
        window.requestAnimationFrame( draw );
    }
    draw();
    
    // SSE
    var source = new EventSource('position/get.php');
    
    source.addEventListener('message', function(e) {
        var data = JSON.parse(e.data);
        
        puppet.rotation.x = data.x;
        puppet.rotation.y = data.y;
        puppet.rotation.z = data.z;
        //renderer.render(scene, camera);
    }, false);
    
    source.addEventListener('open', function(e) {
        // Connection was opened.
    }, false);
    
    source.addEventListener('error', function(e) {
        if (e.readyState == EventSource.CLOSED) {
        // Connection was closed.
        }
    }, false);

})( window );