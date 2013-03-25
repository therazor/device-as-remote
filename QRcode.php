<?php

require 'phpqrcode/qrlib.php';

QRcode::png( $_GET['message'], false, 4, 10);

?>
