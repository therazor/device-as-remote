<?php

$sharedMem = shmop_open( $_GET['client-id'], "c", 0644, 100 );
$orientation = array(
	'x' => $_GET['x'] / 180 * 3.14,
	'y' => $_GET['y'] / 180 * 3.14,
	'z' => $_GET['z'] / 180 * 3.14
);
shmop_write(
	$sharedMem,
	serialize( $orientation ),
	0
);

?>
