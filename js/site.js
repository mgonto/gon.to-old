$("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.JPG'],a[href$='.png'],a[href$='.gif']").addClass("image-popup");

$("article").fitVids();

$(document).ready(function() {
  $("#header").midnight();

  $(".scroll-down").on("click", function(){
    $("html, body").animate({scrollTop: $("#services").offset().top}, "slow");
  });

  $(".backToTop").on("click", function(e){
    $("html, body").animate({scrollTop: $("#hero").offset().top}, "slow");
    e.preventDefault();
  });

  $('.image-popup').magnificPopup({
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    },
    image: {
      tError: '<a href="%url%">Image #%curr%</a> could not be loaded.',
    },
    removalDelay: 300, // Delay in milliseconds before popup is removed
    // Class that is added to body when popup is open.
    // make it unique to apply your CSS animations just to this exact popup
    mainClass: 'mfp-fade'
  });




});
