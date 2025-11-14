<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $email = $input['email'] ?? '';
    $firstName = $input['firstName'] ?? '';
    $lastName = $input['lastName'] ?? '';
    $role = $input['role'] ?? '';
    
    if (empty($email) || empty($firstName) || empty($lastName)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }
    
    $conn = getDBConnection();
    
    // Update user profile
    $stmt = $conn->prepare("UPDATE tbl_user SET fname = ?, lname = ?, roles = ?, status = 'active' WHERE email = ?");
    $stmt->bind_param("ssss", $firstName, $lastName, $role, $email);
    
    if ($stmt->execute()) {
        // Get user ID
        $stmt = $conn->prepare("SELECT user_id FROM tbl_user WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        
        echo json_encode([
            'success' => true,
            'message' => 'Profile completed successfully',
            'user_id' => $user['user_id']
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Profile update failed']);
    }
    
    $conn->close();
}
?>