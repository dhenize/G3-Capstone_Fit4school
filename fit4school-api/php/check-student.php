<?php
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $student_id = $_GET['id'] ?? '';
    
    if (empty($student_id)) {
        echo json_encode(['success' => false, 'message' => 'Student ID is required']);
        exit;
    }
    
    $conn = getDBConnection();
    
    $stmt = $conn->prepare("SELECT student_id, full_name, birthdate, gender FROM tbl_stud WHERE student_id = ?");
    $stmt->bind_param("i", $student_id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        echo json_encode(['exists' => false, 'message' => 'Student not found']);
    } else {
        $student = $result->fetch_assoc();
        echo json_encode([
            'exists' => true,
            'student' => [
                'id' => $student['student_id'],
                'full_name' => $student['full_name'],
                'birthdate' => $student['birthdate'],
                'gender' => $student['gender']
            ]
        ]);
    }
    
    $conn->close();
}
?>