$(document).ready(function() {
  $("#header").midnight();

  $(".scroll-down").on("click", function(){
    $("html, body").animate({scrollTop: $("#services").offset().top}, "slow");
  });

  $(".backToTop").on("click", function(e){
    $("html, body").animate({scrollTop: $("#hero").offset().top}, "slow");
    e.preventDefault();
  });


});
