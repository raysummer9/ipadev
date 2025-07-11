<?php
header('Content-Type: application/json');

// Load Composer's autoloader for PHPMailer and Dotenv
require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/phpmailer/PHPMailer.php';
require __DIR__ . '/phpmailer/SMTP.php';
require __DIR__ . '/phpmailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

// Debug: log current directory and files
error_log('Current dir: ' . __DIR__);
error_log('Files: ' . implode(', ', scandir(__DIR__)));

// Load .env with error handling
try {
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();
} catch (Exception $e) {
    error_log('Dotenv error: ' . $e->getMessage());
}

// Debug: log loaded environment variables
error_log('SMTP_HOST: ' . getenv('SMTP_HOST'));
error_log('SMTP_USER: ' . getenv('SMTP_USER'));
error_log('SMTP_PASS: ' . (getenv('SMTP_PASS') ? 'SET' : 'NOT SET'));
error_log('SMTP_PORT: ' . getenv('SMTP_PORT'));

// Alternative method: read .env file directly if getenv fails
if (empty(getenv('SMTP_HOST'))) {
    error_log('Environment variables not loaded, trying direct file read');
    $envFile = __DIR__ . '/.env';
    if (file_exists($envFile)) {
        $envContent = file_get_contents($envFile);
        $envLines = explode("\n", $envContent);
        $envVars = [];
        
        foreach ($envLines as $line) {
            $line = trim($line);
            if (!empty($line) && strpos($line, '#') !== 0) {
                $parts = explode('=', $line, 2);
                if (count($parts) === 2) {
                    $key = trim($parts[0]);
                    $value = trim($parts[1]);
                    $envVars[$key] = $value;
                    putenv("$key=$value");
                }
            }
        }
        
        error_log('Directly loaded variables: ' . implode(', ', array_keys($envVars)));
    } else {
        error_log('.env file not found at: ' . $envFile);
    }
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit;
}

// Get POST data and sanitize
$name = isset($_POST['name']) ? strip_tags(trim($_POST['name'])) : '';
$email = isset($_POST['email']) ? filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL) : '';
$phone = isset($_POST['phone']) ? strip_tags(trim($_POST['phone'])) : '';
$message = isset($_POST['message']) ? strip_tags(trim($_POST['message'])) : '';

// Validate required fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
    exit;
}

$mail = new PHPMailer(true);
try {
    // SMTP settings from .env
    $mail->isSMTP();
    $mail->Host = getenv('SMTP_HOST');
    $mail->SMTPAuth = true;
    $mail->Username = getenv('SMTP_USER');
    $mail->Password = getenv('SMTP_PASS');
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = getenv('SMTP_PORT');

    // Validate SMTP configuration
$smtpUser = getenv('SMTP_USER');
$smtpHost = getenv('SMTP_HOST');
$smtpPass = getenv('SMTP_PASS');
$smtpPort = getenv('SMTP_PORT');

if (empty($smtpUser) || empty($smtpHost) || empty($smtpPass) || empty($smtpPort)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'SMTP configuration is incomplete. Please check your .env file.']);
    exit;
}

$mail->setFrom($smtpUser, 'IPADEV Website');
$mail->addAddress($smtpUser);
    $mail->addReplyTo($email, $name);

    $mail->isHTML(false);
    $mail->Subject = 'New Contact Form Submission';
    $mail->Body = "Name: $name\nEmail: $email\nPhone: $phone\nMessage:\n$message";

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Thank you for contacting us! We will get back to you soon.']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email. Mailer Error: ' . $mail->ErrorInfo]);
} 