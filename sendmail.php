<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require __DIR__ .'/PHPMailer/src/Exception.php'; 
    require __DIR__ .'/PHPMailer/src/PHPMailer.php';
    require __DIR__ .'/PHPMailer/src/SMTP.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/Language/');
    $mail->IsHTML(true);


     
    $mail->isSMTP();
    $mail->SMTPAuth = true;
    $mail->SMTPDebug = 0;



    $mail->Host = 'ssl://smtp.yandex.ru';
    $mail->Port = 465;
    
    $mail->SMTPAuth = true;
    $mail->Username = 'site511@yandex.ru';
    $mail->Password = 'saymweqxqqfnquji';



    $mail->setFrom('site511@yandex.ru', 'Сообщение с Формы сайта');
    $mail->addAddress('site511@yandex.ru');
    $mail->Subject = 'Сообщение от клиента с сайта';




    $hand = "Хочу заказать транспорт";
    if($_POST['hand'] == "left") {
        $hand = "Хочу получить расчёт";
    }

    $body = '<h1>Сообщение от посетителя сайта!</h1>';

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>E-Mail:</strong> '.$_POST['email'].'</p>';
    }

    if(trim(!empty($_POST['hand']))){
        $body.='<p><strong>Требуемая услуга клиенту:</strong> '.$hand.'</p>';
    }

    /* if(trim(!empty($_POST['age']))){
        $body.='<p><strong>Возраст:</strong> '.$_POST['age'].'</p>';
    } */

    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
    }

    /*
    if (!empty($_FILES['image']['tmp_name'])) {
        $filePath = __DIR__ . "/files/" . $_FILES['image']['name'];

        if(copy($_FILES['image']['tmp_name'], $filePath)) {
            $fileAttach = $filePath;
            $body.='<p><strong>фото в приложении</strong>';
            $mail->addAttachment($fileAttach);
        }
    }
    */

    $mail->Body = $body; 


    if (!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>