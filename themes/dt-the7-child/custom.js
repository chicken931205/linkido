jQuery(document).ready(function ($) {
	let commissionTxt = $('#commissionVal').html();
	if (commissionTxt) {
		$('#commissionVal').html(commissionTxt.replace(/{commission}/g, commissionVal)).show();
	}
	// console.log(commissionVal+" tested");
	
	$('.expand-room-btn').on('click', function () {
		$(document.body).css({overflow:'hidden'});
		
		let wind = $(window);
		let docm = $(document);
		let room = $('.room-container');
		let shnk = $('.shrink-room-btn');
		room.css({
			zIndex: 12000,
			position: 'fixed',
			top: room.offset().top - docm.scrollTop(),
			left: room.offset().left, 
			width: room.width(),
			height: room.height()
		});
		room.animate({
			marginTop: 0,
			top: 10,
			left: 10,
			width: wind.width() - 20,
			height: wind.height() - 20
		}, 150, function () {
			shnk.show();
		});
		
		$('.shrink-room-btn').on('click', function () {
			room.css({
				position: 'relative',
				width: 'auto',
				height: 580, 
				zIndex: 'auto',
				left: 'auto'
			});
			shnk.hide();
			$(document.body).css({overflow:'auto'});
		});
	});
	
	$('#add_room_link_btn').on('click', function () {
		let teamId = "97b22fd9-5698-41b2-bab9-303bdfb1da8c";
		let devKey = "CLM8LWJgeywGhlI3opd85ezmyucfVzyY4rN0tfvMk1I6ji5a7Uj2XuSUB1Lngru9";
		$.ajax({
			url: 'https://api.digitalsamba.com/api/v1/rooms',
			type: 'POST',
			dataType: 'json',
			headers: {'Content-Type': 'application/json'},
			data: JSON.stringify({
				privacy: 'public'
			}),
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "Basic " + btoa(teamId + ":" + devKey));
			},
			success: function(response) {
				$('#course-room-link').val(response.room_url);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.error('Error creating room link:', textStatus, errorThrown);
			}
		});
	});
	
	$('iframe').on('load', function() {
		setTimeout(()=>{
			$(this).css({display: 'block'});
		}, 2000);		
	});

	// Custom Course Full Price by:
	// Teacher price + platform% = Course Full Price
	// $("input[name='course_sale_price']").attr('disabled', true);
	// $('.tutor-course-price-paid div.tutor-form-label').text("Course Full Price");

	// $("input[name='course_price']").on('change', function(){
	// 	var tutor_course_price = $("input[name='course_price']").val();
	// 	var rate_percentage = commissionVal.replace(/\D/g, "");
	// 	var percentage = tutor_course_price * rate_percentage/100;
	// 	$("input[name='course_sale_price']").val(parseInt(tutor_course_price) + parseInt(percentage));
	// });
	
});



jQuery(document).ready(function ($) {
	$("a:contains('Register Now')").attr("href", "https://linkido.com/sign-up");
    $("a:contains('Registreeru nüüd')").attr("href", "https://linkido.com/et/registreeru/");
	$("a:contains('Rekisteröidy nyt')").attr("href", "https://linkido.com/fi/rekisteroidy/");
	$("a:contains('Jetzt anmelden')").attr("href", "https://linkido.com/de/anmelden/");
	$("a:contains('Regístrate ahora')").attr("href", "https://linkido.com/es/inscribete/");
	$("a:contains('Зарегистрируйся сейчас')").attr("href", "https://linkido.com/ru/%d0%b7%d0%b0%d1%80%d0%b5%d0%b3%d0%b8%d1%81%d1%82%d1%80%d0%b8%d1%80%d0%be%d0%b2%d0%b0%d1%82%d1%8c%d1%81%d1%8f/");
	$("a:contains('Зареєструйтесь зараз')").attr("href", "https://linkido.com/uk/%d0%b7%d0%b0%d1%80%d0%b5%d1%94%d1%81%d1%82%d1%80%d1%83%d0%b2%d0%b0%d1%82%d0%b8%d1%81%d1%8f/");
});

jQuery(document).ready(function($) {
	// Find the second tutor-course-builder-section element and hide it
	var secondSection = $('.tutor-course-builder-section').eq(2);
	secondSection.hide();
	
    // Find the last tutor-course-builder-section element
    var lastSection = $('.tutor-course-builder-section').last();

    // Find the last and second tutor-mb-32 elements within the last section and hide them
    var lastMb32 = lastSection.find('.tutor-mb-32').last();
    var secondMb32 = lastSection.find('.tutor-mb-32').eq(1);
    lastMb32.hide();
    secondMb32.hide();
});

function hideZero() {
  const dropdownItems = document.querySelectorAll('.el-select-dropdown__list span:last-child');
  dropdownItems.forEach(item => {
    if (item.textContent === '0.00') {
      item.style.display = 'none';
    }
  });
}

function removeSuffix() {
  const inputElement = document.querySelector('.am-duration-container .el-input__inner');
  if (inputElement) {
    const currentValue = inputElement.value;
    const newValue = currentValue.replace(/ \(\d+\.\d+\)$/, '');
    inputElement.value = newValue;
  }
}

function checkForChanges() {
  hideZero();
  removeSuffix();
}

window.addEventListener('load', () => {
  // Call the function to hide "0.00" from dropdown items
  hideZero();

  // Call the function to remove the "(0.00)" suffix initially
  removeSuffix();

  // Add an event listener to detect changes when the user selects an option from the menu
  const inputElement = document.querySelector('.am-duration-container .el-input__inner');
  if (inputElement) {
    inputElement.addEventListener('change', () => {
      // Call the function to remove the "(0.00)" suffix after the user selects an option
      removeSuffix();
    });
  }

  // Use setInterval to periodically check for changes and reapply modifications
  setInterval(checkForChanges, 0); // Adjust the interval as needed (5000 milliseconds = 5 seconds)
});
