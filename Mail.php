<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

function SendMail($recipient_email, $subject, $message)
{
    try {
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'jdpcjos1@gmail.com'; // Host: Replace with your Gmail
        $mail->Password = 'your-app-password'; // Host: Replace with App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        $mail->setFrom('jdpcjos1@gmail.com', 'JDPC Contact Form');
        $mail->addAddress($recipient_email); // Updated to organization's email
        $mail->addReplyTo($_POST['contactEmail'], $_POST['firstName'] . ' ' . $_POST['lastName']);

        $mail->isHTML(true);
        $mail->Subject = $subject;

        $emailBody = "<h2>New Contact Form Submission</h2>
                      <p><strong>First Name:</strong> {$_POST['firstName']}</p>
                      <p><strong>Last Name:</strong> {$_POST['lastName']}</p>
                      <p><strong>Email:</strong> {$_POST['contactEmail']}</p>
                      <p><strong>Message:</strong> {$_POST['contactMessage']}</p>";

        $mail->Body = $emailBody;

        $mail->send();
        return "Message sent successfully!";
    } catch (Exception $e) {
        return "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $response = SendMail('jdpcjos1@gmail.com', 'New Contact Form Submission', '');
    echo json_encode(['message' => $response]);
    exit;
}
?>