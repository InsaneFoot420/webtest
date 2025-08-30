<?php
header('Content-Type: application/json; charset=utf-8');
$to = filter_input(INPUT_POST, 'to', FILTER_SANITIZE_EMAIL);
$name = trim(filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$phone = trim(filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
$message = trim(filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS));
if(!$to || !$email || !$name){ echo json_encode(['sent'=>false,'error'=>'missing']); exit; }
$subject = 'Nový poptávkový formulář — InsaneKoloběky';
$body = "Jméno: {$name}
E-mail: {$email}
Telefon: {$phone}

Zpráva:
{$message}

— Odesláno z webu InsaneKoloběky";
$headers = "From: InsaneKolobeky Web <no-reply@{$_SERVER['SERVER_NAME']}>
";
$headers .= "Reply-To: {$email}
";
$headers .= "X-Mailer: PHP/" . phpversion();
$sent = @mail($to, $subject, $body, $headers);
echo json_encode(['sent'=>$sent]);
?>