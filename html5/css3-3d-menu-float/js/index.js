// This code is also terrible

var BV, loadingCube;

$(document).ready(function () {
	// Resize
    $(window).on("resize", function () {
        //resize();
        resizeZube();
    }).trigger("resize");

    // Init video
    //initVideo();
    var BV = new $.BigVideo();
    var vids = [
        'http://robertbue.no/playground/carls-html/assets/video/carls_sd.mp4'
    ];
	BV.init();
	BV.show(vids,{ambient:true});
	BV.getPlayer().play();
    

    $(window).on('mousemove', function(event) {
	    var width = $(window).width();
	    var mouseX = event.pageX - (width * 0.5);
	    var height = $(window).height();
	    var mouseY = event.pageY - (height * 0.5);
	    var xAngle = (mouseY / height) * 10;
	    var yAngle = (mouseX / width) * 30;

	    var xAngle2 = (mouseY / height) * 20;
	    var yAngle2 = (mouseX / width) * 30;

	    TweenMax.to('#box', .3, {rotationX: xAngle, rotationY: yAngle});
	});

	$('.item').on("click", function(event){
		TweenMax.to('#main-nav', 1, {scale: 0, ease:Back.easeOut, onComplete: function () {
			TweenMax.to('#main-nav', 1, {scale: 0, ease:Back.easeOut, onComplete: function () {
				TweenMax.to('#main-nav', 1, {scale: 1, ease:Back.easeOut, onComplete: function () {

			}});
			}});
		}});
	});
});

function resizeZube(event) {
    var y = ($(window).height() - 240) * 0.5;
    //$('#menu').css('margin-top', y+'px');
}


// Resize slideshow
function resize() {
	// calculate width and height
	var w = $(window).outerWidth(true);
	var h = $(window).outerHeight(true);
}