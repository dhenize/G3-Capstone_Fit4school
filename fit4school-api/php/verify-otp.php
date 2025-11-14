<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $email = $input['email'] ?? '';
    $code = $input['code'] ?? '';
    
    if (empty($email) || empty($code)) {
        echo json_encode(['success' => false, 'message' => 'Email and OTP are required']);
        exit;
    }
    
    $conn = getDBConnection();
    
    $stmt = $conn->prepare("SELECT * FROM tbl_otp WHERE email = ? AND code = ? AND used = 0");
    $stmt->bind_param("ss", $email, $code);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Invalid OTP']);
        exit;
    }
    
    $otp = $result->fetch_assoc();
    
    if (strtotime($otp['expires_at']) < time()) {
        echo json_encode(['success' => false, 'message' => 'OTP expired']);
        exit;
    }
    
    $conn->query("UPDATE tbl_otp SET used = 1 WHERE id = " . $otp['id']);
    
    echo json_encode(['success' => true, 'message' => 'OTP verified successfully']);
    $conn->close();
}
?>