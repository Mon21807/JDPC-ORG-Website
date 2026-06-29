<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

error_reporting(0);
header('Content-Type: application/json');

// ============================================================
// 1. REQUIRE PHPMailer
// ============================================================
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// ============================================================
// 2. CHECK IF POST REQUEST
// ============================================================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // ============================================================
    // 3. GET FORM DATA
    // ============================================================
    $firstName      = isset($_POST['firstName'])      ? trim($_POST['firstName'])      : '';
    $lastName       = isset($_POST['lastName'])       ? trim($_POST['lastName'])       : '';
    $senderEmail    = isset($_POST['contactEmail'])   ? trim($_POST['contactEmail'])   : '';
    $subject        = isset($_POST['subject'])        ? trim($_POST['subject'])        : 'No Subject';
    $contactMessage = isset($_POST['contactMessage']) ? trim($_POST['contactMessage']) : '';

    // ============================================================
    // 4. VALIDATE REQUIRED FIELDS
    // ============================================================
    if (empty($firstName) || empty($senderEmail) || empty($contactMessage)) {
        echo json_encode(['success' => false, 'message' => 'Please fill all required fields.']);
        exit;
    }

    // Validate email
    if (!filter_var($senderEmail, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Please enter a valid email address.']);
        exit;
    }

    // ============================================================
    // 5. SEND EMAIL USING PHPMailer
    // ============================================================
    $mail = new PHPMailer(true);

    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host       = 'smtp.mail.yahoo.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'jdpcaritasjs@yahoo.com'; 
        $mail->Password   = 'mjyavxgjyysrnicc'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Sender & Recipient - SEND TO YOUR EMAIL
        $mail->setFrom('jdpcaritasjs@yahoo.com', 'JDPC Jos Website');
        $mail->addAddress('jdpcaritasjs@yahoo.com'); // <--- YOUR EMAIL
        $mail->addReplyTo($senderEmail, $firstName . ' ' . $lastName);

        // Email Content
        $mail->isHTML(true);
        $mail->Subject = "📬 Contact Form: " . $subject;
        
        $currentDate = date('d M, Y');
        $year = date('Y');

        $mail->Body = "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #0a7304, #0c8f05); color: #ffffff; padding: 30px; text-align: center; }
                .header h1 { margin: 0; font-size: 22px; text-transform: uppercase; }
                .header .type-badge { display: inline-block; background: #ffcc00; color: #0a7304; padding: 4px 16px; border-radius: 50px; font-size: 11px; font-weight: bold; margin-top: 8px; }
                .content { padding: 30px; color: #333; }
                .badge { display: inline-block; background: #e94560; color: #fff; padding: 4px 16px; border-radius: 50px; font-size: 11px; font-weight: bold; margin-bottom: 20px; }
                .details { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                .details td { padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
                .label { color: #888; width: 100px; font-weight: 600; }
                .value { font-weight: 500; color: #222; }
                .msg-box { background: #fafafa; border-left: 4px solid #0a7304; padding: 15px; margin-top: 10px; font-style: italic; }
                .btn-wrap { text-align: center; margin-top: 25px; }
                .btn { background: #0a7304; color: #ffffff !important; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; }
                .footer { background: #1a0f0a; color: #888; padding: 20px; text-align: center; font-size: 11px; }
                .contact-type { background: #e8f5e9; padding: 10px 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid #c8e6c9; }
                .contact-type strong { color: #0a7304; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>📬 JDPC Jos</h1>
                    <div class='type-badge'>CONTACT FORM</div>
                </div>
                <div class='content'>
                    <span class='badge'>NEW CONTACT INQUIRY</span>
                    
                    <div class='contact-type'>
                        <strong>📌 This is a general contact form submission</strong>
                    </div>
                    
                    <table class='details'>
                        <tr><td class='label'>Name:</td><td class='value'>$firstName $lastName</td></tr>
                        <tr><td class='label'>Email:</td><td class='value'>$senderEmail</td></tr>
                        <tr><td class='label'>Date:</td><td class='value'>$currentDate</td></tr>
                        <tr><td class='label'>Subject:</td><td class='value'>$subject</td></tr>
                    </table>
                    <div style='font-size: 14px; font-weight: bold; color: #0a7304;'>📝 Message:</div>
                    <div class='msg-box'>" . nl2br(htmlspecialchars($contactMessage)) . "</div>
                    <div class='btn-wrap'>
                        <a href='mailto:$senderEmail' class='btn'>Reply to $firstName</a>
                    </div>
                </div>
                <div class='footer'>
                    &copy; $year JDPC Jos. All rights reserved.<br>
                    This message was sent via the Contact Form
                </div>
            </div>
        </body>
        </html>";

        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);

    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid Request']);
}
?>