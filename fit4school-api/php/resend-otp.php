<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $email = $input['email'] ?? '';
    
    if (empty($email)) {
        echo json_encode(['success' => false, 'message' => 'Email is required']);
        exit;
    }
    
    $conn = getDBConnection();
    
    // Generate new OTP
    $otp = rand(100000, 999999);
    $expires_at = date('Y-m-d H:i:s', time() + 300); // 5 minutes
    
    // Delete existing OTP
    $conn->query("DELETE FROM tbl_otp WHERE email = '$email'");
    
    // Insert new OTP
    $stmt = $conn->prepare("INSERT INTO tbl_otp (email, code, expires_at) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $email, $otp, $expires_at);
    
    if ($stmt->execute()) {
        // Send email
        $email_sent = sendEmail($email, $otp);
        
        echo json_encode([
            'success' => true,
            'message' => $email_sent ? 'New OTP sent to your email' : 'Failed to send OTP',
            'test_otp' => $otp // For testing
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to resend OTP']);
    }
    
    $conn->close();
}
?>