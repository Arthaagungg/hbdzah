<?php
// Set the content type to JSON for response
header('Content-Type: application/json');

// Read the raw POST data from the request body
$data = file_get_contents('php://input');

// Decode the JSON data
$requestData = json_decode($data, true);

// Check if the data is valid
if (isset($requestData['message']) && isset($requestData['timestamp'])) {
    $message = $requestData['message'];
    $timestamp = $requestData['timestamp'];

    // Format the content to be written into the file
    $content = "Timestamp: $timestamp\nMessage: $message\n\n";

    // Specify the file path (make sure the server has write permissions to this file)
    $filePath = 'doa.txt';

    // Append the message to the file
    file_put_contents($filePath, $content, FILE_APPEND);

    // Send a JSON response back
    echo json_encode(['status' => 'success', 'message' => 'Message saved']);
} else {
    // If data is invalid, send an error response
    echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
}
?>
