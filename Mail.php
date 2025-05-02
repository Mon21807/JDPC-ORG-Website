<?php


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

function SendMail($sender_email, $subject, $message)
{
    try {
        $mail = new PHPMailer(true);     
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;  
        $mail->isSMTP();
        $mail->Host       = 'smtp.mail.yahoo.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'jdpcjos1@gmail.com';
        $mail->Password   = 'tjkpshbncjbkxdji'; // Consider using an environment variable for security
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 465;
        $mail->setFrom('jdpcjos1@gmail.com', "JDPC");
        $mail->addAddress($sender_email);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body    = $message;

        // Attempt to send the email
        $mail->send();
        return "";
    } catch (Exception $e) {
        return "";
    }
}


// $mail = $_POST['contactEmail'];
// $msg = $_POST['contactMessage'];

// $data = "<div>Email - $mail</div><div>Message : $msg</div>"

// SendMail('jdpcaritasjs@yahoo.com','JDPC',$data);
SendMail('newpk09877@gmail.com','JDPC','Test');


?>