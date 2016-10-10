

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
} 

function _x(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    while (xres = xresult.iterateNext()) {
        xnodes.push(xres);
    }

    return xnodes;
}

$(function() {


	// Get the form.
	var form = $('#ajax-contact');

	// Get the messages div.
	var formMessages = $('.formMessages');
	
	var spinner = $('#spinner');
	
	var submit = $('#submit');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();
			//hide the submit button
		$(submit).addClass('hidden');
		//display the cog animation
		$(spinner).removeClass('hidden');
	

		//console.log($('.item-price').length);
		jsonObj=[];
	
		formdata = {};
		formdata["textbox"] = $("#textbox").val();
		formdata["name"] = $('#name').val();
		formdata["phone"] = $('#phone').val();
		formdata["email"] = $('#emaile').val();
		var x = 
		{
			"cart" : jsonObj,
			"formdata" : formdata,
			"captchaResponse" : $("#g-recaptcha-response").val()
		};
		//jsonString = jsonObj+formdata;
		var y = JSON.stringify(x);
		//console.log(y);
		//var result = jQuery.parseJSON(y);
		//console.log(result);


		// Serialize the form data.
		//var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'post',
			url: '/assets/php/sendjs.php' ,
			//url: $(form).attr('action'),
			data: y,
			contentType: "application/json; charset=utf-8",
			traditional: true,
			success: function (response) {
                		if(response=="Thank You! Your message has been sent.")
                		{
					//remove the button animation
					$(spinner).addClass('hidden');
                	$(formMessages).removeClass('error');
					$(formMessages).addClass('success');
					$("#textbox").val('');
                	$('#name').val('');
					$('#emaile').val('');
					$('#message').val('');
					$('#phone').val('');
					
                		}
                		else
                		{
                	$(formMessages).removeClass('success');
					$(formMessages).addClass('error');
					$(spinner).addClass('hidden');
					$(submit).removeClass('hidden');
                		}
                		
				$(formMessages).text(response);
                		
            			}
			
		});
		//.done(function(response) {
		//	console.log(response);
			// Make sure that the formMessages div has the 'success' class.
			//$(formMessages).removeClass('error');
			//$(formMessages).addClass('success');

			// Set the message text.
			//$(formMessages).text(response);

			// Clear the form. Temporarily diabled while developing
			//$('#name').val('');
			//$('#email').val('');
			//$('#message').val('');
		//})
	

	});

});