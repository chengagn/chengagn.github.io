$('#slider .item').each(function(i){
  var $this = $(this),
      width = $this.width(),
      left = width * i,
      color = 25 * i;
  $this.css({ left: left })
  .find('.inset').css({ backgroundColor: 'hsl(' + color + ',65%,50%)' });
});
$('#slider .item .inset').each(function(){
  var $this = $(this),
      color = $this.css('backgroundColor');
  $this.append('<div class="shadow"></div>');
  $this.find('.shadow').css({
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    'box-shadow': '0 0 25px 25px ' + color
  });
});
$('.trigger').on('click',function(){
  var $this = $(this),
      width = $('.item').width() * 4,
      speed = 500;
  if ( $this.hasClass('first') ) {
    $('.frame').animate({ scrollLeft: 0 },speed * 3);
  } else if ( $this.hasClass('last') ) {
    $('.frame').animate({ scrollLeft: $('.frame')[0].scrollWidth },speed * 3);
  } else if ( $this.hasClass('prev') ) {
    $('.frame').animate({ scrollLeft: '-=' + width },speed);
  } else if ( $this.hasClass('next') ) {
    $('.frame').animate({ scrollLeft: '+=' + width },speed);
  }
});