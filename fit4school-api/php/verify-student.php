<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $user_id = $input['userId'] ?? '';
    $student_id = $input['studentId'] ?? '';
    $role = $input['role'] ?? '';
    
    if (empty($user_id) || empty($student_id)) {
        echo json_encode(['success' => false, 'message' => 'User ID and Student ID are required']);
        exit;
    }
    
    $conn = getDBConnection();
    
    // Check if student exists
    $stmt = $conn->prepare("SELECT full_name FROM tbl_stud WHERE student_id = ?");
    $stmt->bind_param("i", $student_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        echo json_encode(['success' => false, 'message' => 'Student not found']);
        exit;
    }
    
    $student = $result->fetch_assoc();
    
    // Update user with student ID
    $stmt = $conn->prepare("UPDATE tbl_user SET student_id = ? WHERE user_id = ?");
    $stmt->bind_param("is", $student_id, $user_id);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'Student verification successful',
            'student_name' => $student['full_name']
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Verification failed']);
    }
    
    $conn->close();
}
?>