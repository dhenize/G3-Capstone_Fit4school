<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $email = $input['email'] ?? '';
    $password = $input['password'] ?? '';
    $fname = $input['fname'] ?? '';
    $lname = $input['lname'] ?? '';
    $contact_number = $input['contact_number'] ?? '';
    
    if (empty($email) || empty($password)) {
        echo json_encode(['success' => false, 'message' => 'Email and password are required']);
        exit;
    }
    
    $conn = getDBConnection();
    
    $stmt = $conn->prepare("SELECT user_id FROM tbl_user WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already registered']);
        exit;
    }
    

    $user_id = 'USR' . time() . rand(10000, 99999);
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    
    $stmt = $conn->prepare("INSERT INTO tbl_user (user_id, fname, lname, email, password, contact_number, status) VALUES (?, ?, ?, ?, ?, ?, 'inactive')");
    $stmt->bind_param("ssssss", $user_id, $fname, $lname, $email, $hashed_password, $contact_number);
    
    if ($stmt->execute()) {
        $otp = rand(100000, 999999);
        $expires_at = date('Y-m-d H:i:s', time() + 300); // 5 minutes
        
        $conn->query("DELETE FROM tbl_otp WHERE email = '$email'");
        
        $stmt = $conn->prepare("INSERT INTO tbl_otp (email, code, expires_at) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $email, $otp, $expires_at);
        $stmt->execute();
        
        $email_sent = sendEmail($email, $otp);
        
        echo json_encode([
            'success' => true,
            'message' => $email_sent ? 'OTP sent to your email' : 'Signup successful but email failed',
            'user_id' => $user_id,
            'test_otp' => $otp 
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Signup failed']);
    }
    
    $conn->close();
}
?>