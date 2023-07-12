jQuery( document ).ready(function( $ ) {

	$('.test').on('click',function(e) {
		$('.progress-bar').css('width',$(this).data('val'));
		//$('.progress-text').text($(this).data('val'));
	});
	$('#slider').on('input',function(e) {
		$('.progress-bar').css('width',e.target.value+'%');
	});

	// create an observer instance
	var observer = new MutationObserver(function(mutations) {
	  mutations.forEach(function(mutation) {
	  	if (mutation.type == 'attributes' && mutation.attributeName == 'style') {
	    	var el = mutation.target;
	        var width = el.style.width; // Can't use jQuery here, as we need the value back in percent
			var $parentEl =$(el).parent('.progress');
			$parentEl.attr('data-width',width); // Why doesn't this work?? $parentEl.data('width',width)
			$parentEl.find('.progress-text').text(width);
	  	}
	  });
	});

	// configuration of the observer
	var config = {
		attributes: true,
		attributeFilter: ['style'],
		childList: false,
		characterData: false
	};

	$('.progress-bar').each(function(e) {
		// pass in the target node, as well as the observer options
		observer.observe(this, config);
	})

  $('.test').eq(4).trigger('click');
});