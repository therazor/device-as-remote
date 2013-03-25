<?php

session_start();

if( empty($_SESSION['client-id']) ) {
    $_SESSION['client-id'] = rand(0, 100);
}
    
$sharedMem = shmop_open( $_SESSION['client-id'], "c", 0644, 100 );

?><!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Controlled cube</title>
        <meta name="viewport" content="width=device-width">

        <link rel="stylesheet" href="css/normalize.css">
        <link rel="stylesheet" href="css/main.css">
        <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    </head>
    <body>
        <div id="stage"></div>
	<?php $remoteUrl = 'http://' . $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI'] . 'remote-control.html?client-id=' . $_SESSION['client-id']; ?>
	<img src="QRcode.php?message=<?=urlencode($remoteUrl)?>">
	<p><?=$remoteUrl?></p>

        <script src="js/three.min.js"></script>
        <script src="js/main.js"></script>
    </body>
</html>
