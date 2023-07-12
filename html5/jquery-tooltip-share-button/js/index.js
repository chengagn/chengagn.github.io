$(document).ready(function(){
  
  //Share Tool Function
  function shareTools() {
  var pageTitle = $(document).attr('title'),
      url = document.URL,
      mailBody = "Check this awesome link out: " + url;
    // Twits
    $('.twitter-share').click(function(e){
      e.preventDefault;
      var text = "Check out " + pageTitle + " on http://heportfolio.com";
       window.open('https://twitter.com/intent/tweet?source=webclient&text=' + text,630,360);
    });
    // Facebooks
    $('.facebook-share').click(function(e){
      e.preventDefault;
      window.open('https://www.facebook.com/sharer.php?u='+url,630,360);
    });
    // Emails 
    $('.email-share').attr('href','mailto:?Subject=' + pageTitle + '&Body=' + mailBody);
 }
 shareTools();
  
 //Tool Tip toggle function
 function tooltip(){
   var  toolHandle = $('.tool-handle'),
        toolMenu = toolHandle.parent(),
        toolClose = toolMenu.find('.close');

        toolHandle.click(function(e){
          e.preventDefault();
          toolMenu.toggleClass('show');
        });
        toolClose.on('click', function(){
          toolMenu.removeClass('show');
        });
  }
  tooltip();
  
  // Start with things clicked
  function clickShare(){
    $(".tool-handle").click();
  }
  setTimeout(function() { clickShare();}, 2000);
});