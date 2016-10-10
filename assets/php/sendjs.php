<?php
	
	
	date_default_timezone_set('Australia/Perth');
	$time = date ("h:i A"); 
	$date = date ("l, F jS, Y");
	$json = file_get_contents('php://input');
	$obj = json_decode($json,true);
	$captcha = $obj["captchaResponse"];
	$captcha;
	
	//real key$secretKey = "6LdZpQcUAAAAANZAeTNgXvo8Ls9KyoFLnEhwv5O4";
	//rest key
	$secretKey = "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";
	$ip = $_SERVER['REMOTE_ADDR'];
	$response=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secretKey."&response=".$captcha."&remoteip=".$ip);
	$responseKeys = json_decode($response,true);
	if(intval($responseKeys["success"]) !== 1) {
		echo "Please Click on the Captcha";
		return false;
	}
	else 
	{
	
	
	

		
  		
  	//echo $items;
  	$name = $obj["formdata"]["name"];
	$phone = $obj["formdata"]["phone"];
	$email = $obj["formdata"]["email"];
	$textbox = $obj["formdata"]["textbox"];

	$to = "orders@diysoakwells.com.au , $email";
	$text = "<html>
	<body>
	<p>This order was submitted from www.diysoakwells.com.au on \n $date at\n $time</p>
	<p>Thank you for your order inquiry. Deliveries are normally every Friday, we will be in contact shortly to discuss your order and confirm a time.</p>
	
	<p>An Invoice will be issued after delivery for payment via bank transfer.</p><p>CUSTOMER DETAILS</p>
	<p>In the meantime if you haven't already seen it, you can take a look at www.soakwellcalculator.com.au to confirm the number of soakwells you ordered will be adequate.</p>
	<p><b>Message:</b>\n$textbox</p>
	<p><b>Email:</b> $email</p>
	<p><b>Name:</b> $name </p>
	<p><b>Phone:</b> $phone </p>";


  	
	//$recipient = "abdullahtariq007@gmail.com";

        // Set the email subject.
        $subject = "New contact from $name";

        // Build the email content.
        $email_content .= $body;

        // Build the email headers.
		$email_headers = "MIME-Version: 1.0\r\n";
		$email_headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
		$email_headers .= "CC: orders@diysoakwells.com.au".PHP_EOL;
		$email_headers .= 'From: orders@DIYSoakwells.com' . "\r\n" .
    'Reply-To: orders@diysoakwells.com.au' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

        if (mail($to, $subject, $email_content, $email_headers)) {
            // Set a 200 (okay) response code.
            //http_response_code(200);
            echo "Thank You! Your message has been sent.";
        } else {
            // Set a 500 (internal server error) response code.
            //http_response_code(500);
            echo "Oops! Something went wrong and we couldn't send your message.";
        }  
        
        }	
  	
?>