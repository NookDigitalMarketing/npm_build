$(function() {


	// Get the form.
	var form = $('#ajax-contact');

	// Get the messages div.
	var formMessages = $('#form-messages');
	
	var spinner = $('#spinner');
	
	var submit = $('#submit');

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();
		
		//display the cog animation
		$(spinner).removeClass('hidden');
		//hide the submit button
		$(submit).addClass('hidden');

		//console.log($('.item-price').length);
		jsonObj=[];
		for(i=1;i<$('.item-price').length;i++)
		{
			item={};
			var itemname = $('.item-name').get(i);
			var itemprice = $('.item-price').get(i);
			var itemquantity = $(".item-quantity").get(i);
			var itemtotal = $(".item-total").get(i);
			item["name"] = itemname.innerHTML;
			item["price"] = itemprice.innerHTML;
			item["quantity"] = itemquantity.innerHTML;
			item["total"] = itemtotal.innerHTML;
			jsonObj.push(item);
		}
		formdata = {};
		formdata["textbox"] = $("#textbox").val();
		formdata["name"] = $('#name').val();
		formdata["phone"] = $('#phone').val();
		formdata["email"] = $('#email').val();
		formdata["address"] = $('#address').val();
		formdata["grandtotal"] = simpleCart.grandTotal();
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
			url: 'mailer.php' ,
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
					$('#email').val('');
					$('#message').val('');
					$('#phone').val('');
					$('#address').val('');
					
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