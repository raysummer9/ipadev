<?php
// Test script to debug .env file loading
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Testing .env file loading...\n";

// Check if .env file exists
$envFile = __DIR__ . '/.env';
echo "Env file path: $envFile\n";
echo "File exists: " . (file_exists($envFile) ? 'YES' : 'NO') . "\n";

if (file_exists($envFile)) {
    echo "File size: " . filesize($envFile) . " bytes\n";
    echo "File permissions: " . substr(sprintf('%o', fileperms($envFile)), -4) . "\n";
    
    // Read and display file content
    $content = file_get_contents($envFile);
    echo "File content:\n";
    echo "---START---\n";
    echo $content;
    echo "\n---END---\n";
    
    // Check for hidden characters
    echo "Character codes:\n";
    for ($i = 0; $i < strlen($content); $i++) {
        $char = $content[$i];
        $code = ord($char);
        if ($code < 32 || $code > 126) {
            echo "Position $i: char code $code\n";
        }
    }
    
    // Parse lines manually
    $lines = explode("\n", $content);
    echo "Parsed lines:\n";
    foreach ($lines as $index => $line) {
        $line = trim($line);
        if (!empty($line) && strpos($line, '#') !== 0) {
            $parts = explode('=', $line, 2);
            if (count($parts) === 2) {
                $key = trim($parts[0]);
                $value = trim($parts[1]);
                echo "Line $index: $key = '$value'\n";
            }
        }
    }
}

// Test Dotenv library
if (file_exists(__DIR__ . '/vendor/autoload.php')) {
    require __DIR__ . '/vendor/autoload.php';
    
    try {
        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
        $dotenv->load();
        echo "Dotenv loaded successfully\n";
        echo "SMTP_HOST: " . getenv('SMTP_HOST') . "\n";
        echo "SMTP_USER: " . getenv('SMTP_USER') . "\n";
        echo "SMTP_PASS: " . (getenv('SMTP_PASS') ? 'SET' : 'NOT SET') . "\n";
        echo "SMTP_PORT: " . getenv('SMTP_PORT') . "\n";
    } catch (Exception $e) {
        echo "Dotenv error: " . $e->getMessage() . "\n";
    }
} else {
    echo "Vendor autoload not found\n";
}
?> 