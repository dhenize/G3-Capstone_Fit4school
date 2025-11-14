<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'cap_fit4school');

define('EMAIL_USER', 'fit4school.official@gmail.com');
define('EMAIL_PASS', 'pmzh zbqg omcc gcna');


function getDBConnection() {
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        die(json_encode(['success' => false, 'message' => 'Database connection failed']));
    }
    return $conn;
}

function sendEmail($to, $otp) {
    $subject = 'Your Fit4School Verification Code';
    $message = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .otp-code { font-size: 32px; font-weight: bold; text-align: center; padding: 20px; background: #f4f4f4; }
        </style>
    </head>
    <body>
        <div class='container'>
            <h2 style='color: #61C35C;'>Fit4School Account Verification</h2>
            <p>Your verification code is:</p>
            <div class='otp-code'>$otp</div>
            <p>This code will expire in 5 minutes.</p>
        </div>
    </body>
    </html>
    ";
    
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Fit4School <" . EMAIL_USER . ">" . "\r\n";
    
    return mail($to, $subject, $message, $headers);
}
?>