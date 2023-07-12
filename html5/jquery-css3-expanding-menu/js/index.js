$(document).ready(function() {
  function showpanel() {
		$('.container').removeClass('startup');
    $('.ball').addClass('active').delay(2000).queue(function(next) {
			$(this).removeClass('active');
			next();
		});
 	}
	
	$('.ball').click(function() {
		$(this).toggleClass('active');
	});


	$('i').click(function() {
		$('.ball').addClass('expand');
		$('.back').addClass('show');
	});

	$('.back').click(function() {
		$(this).removeClass('show');
		$('.ball').removeClass('expand');
		$('.container').addClass('shake').delay(500).queue(function(next) {
			$(this).removeClass('shake');
			next();
		});
	});
	
 setTimeout(showpanel, 1800);
});