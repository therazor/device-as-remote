<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

echo 'retry: 100' . PHP_EOL;

session_start();
$sharedMem = shmop_open( $_SESSION['client-id'], "c", 0644, 100 );

function sendMsg( $positionDiff ) {
    echo "id: " . time() . PHP_EOL;
    echo "data: " . json_encode( $positionDiff ) . PHP_EOL;
    echo PHP_EOL;
    
    ob_flush();
    flush();
}

for ( $i = 0; $i < 100; $i++ ) {
	$orientation = unserialize(shmop_read ( $sharedMem, 0, shmop_size($sharedMem) ) );
	if ( !empty( $orientation ) ) {
		sendMsg( array( 'x' => $orientation['x'], 'y' => $orientation['y'], 'z' => $orientation['z'] ) );
	}
	usleep( 100*1000 );
}
