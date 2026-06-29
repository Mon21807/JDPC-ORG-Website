<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

error_reporting(0);
header('Content-Type: application/json');

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// ============================================================
// 0. CHECK DEADLINE ON SERVER SIDE
// ============================================================
$deadline = strtotime('2026-07-02 16:00:00'); // 2nd July 2026, 4:00 PM
if (time() > $deadline) {
    echo json_encode([
        'success' => false, 
        'message' => 'Applications are now closed. The deadline was 2nd July 2026, 4:00 PM.'
    ]);
    exit;
}

// ============================================================
// 1. CHECK IF POST REQUEST
// ============================================================
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // ============================================================
    // 2. GET FORM DATA
    // ============================================================
    $job_id         = isset($_POST['job_id'])         ? trim($_POST['job_id'])         : 'Unknown';
    $job_title      = isset($_POST['job_title'])      ? trim($_POST['job_title'])      : 'Unknown';
    $full_name      = isset($_POST['full_name'])      ? trim($_POST['full_name'])      : '';
    $email          = isset($_POST['email'])          ? trim($_POST['email'])          : '';
    $phone          = isset($_POST['phone'])          ? trim($_POST['phone'])          : 'Not provided';
    $cover_letter   = isset($_POST['cover_letter'])   ? trim($_POST['cover_letter'])   : '';

    // ============================================================
    // 3. VALIDATE
    // ============================================================
    if (empty($full_name) || empty($email)) {
        echo json_encode(['success' => false, 'message' => 'Full Name and Email are required.']);
        exit;
    }

    // ============================================================
    // 4. HANDLE FILE UPLOADS
    // ============================================================
    $upload_dir = 'uploads/';
    if (!file_exists($upload_dir)) {
        mkdir($upload_dir, 0777, true);
    }

    function upload_job_file($file, $upload_dir, $prefix) {
        if ($file['error'] !== UPLOAD_ERR_OK) {
            return ['error' => 'File upload failed: ' . $file['error']];
        }

        $allowed = ['pdf', 'doc', 'docx'];
        $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        
        if (!in_array($ext, $allowed)) {
            return ['error' => 'Only PDF, DOC, and DOCX files are allowed.'];
        }

        $new_name = $prefix . '_' . time() . '_' . preg_replace('/[^a-zA-Z0-9.]/', '_', $file['name']);
        $destination = $upload_dir . $new_name;

        if (!move_uploaded_file($file['tmp_name'], $destination)) {
            return ['error' => 'Failed to save file.'];
        }

        return ['path' => $destination, 'name' => $file['name']];
    }

    // Upload CV
    $cv_result = upload_job_file($_FILES['cv'], $upload_dir, 'CV_' . $full_name);
    if (isset($cv_result['error'])) {
        echo json_encode(['success' => false, 'message' => 'CV Error: ' . $cv_result['error']]);
        exit;
    }

    // Upload Proposal
    $proposal_result = upload_job_file($_FILES['proposal'], $upload_dir, 'Proposal_' . $full_name);
    if (isset($proposal_result['error'])) {
        echo json_encode(['success' => false, 'message' => 'Proposal Error: ' . $proposal_result['error']]);
        exit;
    }

    // ============================================================
    // 5. SEND EMAIL USING PHPMailer
    // ============================================================
    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'jdpcaritasjs@yahoo.com'; 
        $mail->Password   = 'mjyavxgjyysrnicc'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // SEND TO YOUR EMAIL
        $mail->setFrom('jdpcaritasjs@yahoo.com', 'JDPC Jos Careers');
        $mail->addAddress('jdpcaritasjs@yahoo.com'); // <--- YOUR EMAIL
        $mail->addReplyTo($email, $full_name);

        $mail->isHTML(true);
        $mail->Subject = "💼 Job Application: $job_id - $job_title from $full_name";

        $currentDate = date('d M, Y');
        $year = date('Y');

        $mail->Body = "
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #1a237e, #0d47a1); color: #ffffff; padding: 30px; text-align: center; }
                .header h1 { margin: 0; font-size: 22px; text-transform: uppercase; }
                .header .type-badge { display: inline-block; background: #ff6f00; color: #fff; padding: 4px 16px; border-radius: 50px; font-size: 11px; font-weight: bold; margin-top: 8px; }
                .content { padding: 30px; color: #333; }
                .badge { display: inline-block; background: #e94560; color: #fff; padding: 4px 16px; border-radius: 50px; font-size: 11px; font-weight: bold; margin-bottom: 20px; }
                .details { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                .details td { padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; }
                .label { color: #888; width: 120px; font-weight: 600; }
                .value { font-weight: 500; color: #222; }
                .msg-box { background: #fafafa; border-left: 4px solid #0d47a1; padding: 15px; margin-top: 10px; font-style: italic; }
                .btn-wrap { text-align: center; margin-top: 25px; }
                .btn { background: #0d47a1; color: #ffffff !important; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; }
                .attachments { background: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 15px; border: 1px solid #e0e0e0; }
                .attachments h3 { margin: 0 0 10px 0; color: #0d47a1; font-size: 14px; }
                .footer { background: #1a0f0a; color: #888; padding: 20px; text-align: center; font-size: 11px; }
                .job-type { background: #e3f2fd; padding: 10px 15px; border-radius: 8px; margin-bottom: 15px; border: 1px solid #bbdefb; }
                .job-type strong { color: #0d47a1; }
            </style>
        </head>
        <body>
            <div class='container'>
                <div class='header'>
                    <h1>💼 JDPC Jos - Careers</h1>
                    <div class='type-badge'>JOB APPLICATION</div>
                </div>
                <div class='content'>
                    <span class='badge'>NEW JOB APPLICATION</span>
                    
                    <div class='job-type'>
                        <strong>📌 This is a job application submission</strong>
                    </div>
                    
                    <table class='details'>
                        <tr><td class='label'>Position:</td><td class='value'><strong>$job_id</strong> - $job_title</td></tr>
                        <tr><td class='label'>Applicant:</td><td class='value'>$full_name</td></tr>
                        <tr><td class='label'>Email:</td><td class='value'>$email</td></tr>
                        <tr><td class='label'>Phone:</td><td class='value'>$phone</td></tr>
                        <tr><td class='label'>Date:</td><td class='value'>$currentDate</td></tr>
                    </table>
                    
                    <div style='font-size: 14px; font-weight: bold; color: #0d47a1; margin-top: 15px;'>📝 Cover Letter:</div>
                    <div class='msg-box'>" . nl2br(htmlspecialchars($cover_letter)) . "</div>

                    <div class='attachments'>
                        <h3>📎 Attached Files</h3>
                        <p><strong>CV:</strong> " . htmlspecialchars($cv_result['name']) . "</p>
                        <p><strong>Proposal:</strong> " . htmlspecialchars($proposal_result['name']) . "</p>
                    </div>

                    <div class='btn-wrap'>
                        <a href='mailto:$email' class='btn'>Reply to Applicant</a>
                    </div>
                </div>
                <div class='footer'>
                    &copy; $year JDPC Jos. All rights reserved.<br>
                    This application was submitted via the Careers page
                </div>
            </div>
        </body>
        </html>";

        // Attach files
        $mail->addAttachment($cv_result['path'], $cv_result['name']);
        $mail->addAttachment($proposal_result['path'], $proposal_result['name']);

        $mail->send();
        echo json_encode(['success' => true, 'message' => 'Application submitted successfully!']);

    } catch (Exception $e) {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $mail->ErrorInfo]);
    }

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid Request']);
}
?>