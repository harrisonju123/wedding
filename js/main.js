
(function($) {
  "use strict";

//======= Run on Window Load ============
$('.loading-wrapper').css({'visibility': 'visible'}).animate({opacity: '1'}, 600);
$(window).load(function(){ 

  //loader and Intro Animations
  $('.animated').css({'opacity': 0});
	$('#page-loader').delay(1000).fadeOut(400, function(){
	  $('#body').addClass('fadeInUp');
	}); 	
  

  //Viewport
  var windowHeight = $(window).height();

  function adjustViewport() {
    $('.viewport').css('min-height', windowHeight);
  }

  adjustViewport();

  $(window).resize(function(){
    windowHeight = $(window).height();
    adjustViewport();
  });

  var $container = $('#mansonry');
  // initialize Masonry after all images have loaded  
  $container.imagesLoaded( function() {
    $container.masonry({
      itemSelector: '.mansonry-item'
    });
  });
   
});


//==== Run on Document Ready ========
$(document).ready(function(){

//=====>  Countdown (Edit this with your own date)  <====
$("#countdown").countdown("2022/10/10 16:30:00", function(event) {
  var $this = $(this).html(event.strftime(''
     + '<div class="countdown-col-wrapper col-xs-3"><div class="countdown-col"><span class="countdown-time"> %-D </span> Days </div></div> '
     + '<div class="countdown-col-wrapper col-xs-3"><div class="countdown-col"><span class="countdown-time"> %H </span> Hours </div></div>'
     + '<div class="countdown-col-wrapper col-xs-3"><div class="countdown-col"><span class="countdown-time"> %M </span> Minutes </div></div>'
     + '<div class="countdown-col-wrapper col-xs-3"><div class="countdown-col"><span class="countdown-time"> %S </span> Seconds </div></div>'));
});


//Blog item - Hover
$(".blog-item a").on({
    mouseenter: function () {
        $(this).parents('.blog-item').addClass('blog-item-hover');
    },
    mouseleave: function () {
        $(this).parents('.blog-item').removeClass('blog-item-hover');
    }
});

//Submenus
$('.hd-list-menu li ul').hide();

$('.hd-list-menu li').on({
    mouseenter: function () {
        $(this).find('> ul').fadeIn(200);
    },
    mouseleave: function () {
        $(this).find('> ul').fadeOut(200);
    }
});
                

//Home Slideshow

//Active Page
var str=location.href.toLowerCase();
$(".hd-list-menu li a").each(function() {
  if (str.indexOf(this.href.toLowerCase()) > -1) {
    $("li.active").removeClass("active");
    $(this).parent().addClass("active");
  }
});

//Fade Between Links
var newLocation = '';
$('.hd-list-menu a').on('click', function(event)  {

  event.preventDefault();

  newLocation = this.href;

  $('body').fadeOut(300, newpage);

});

function newpage() {
  window.location = newLocation;
}


//Nivo Lightbox
$('#mansonry a').nivoLightbox({
  effect: 'fade'
});


//Smooth Scroll Anchor
 $('a[href*=#]:not([href=#])').on('click', function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

//Form Validator
$(".error").hide();
$(".success").hide();
$(".wait").hide();

$('.form-send input').on('click', function() {
	$(this).attr("value", "Sending...");
});
$("#contactForm").validate({
  invalidHandler: function(event, validator) {
      $('.form-send input').attr("value", "Send");
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "php/contact-form.php",
        data: {
          "name": $("#contactForm #name").val(),
          "email": $("#contactForm #email").val(),
          "guests": $("#contactForm #guests").val(),
          "attending": $("#contactForm #attending").val(),
          "message": $("#contactForm #message").val()
        },
        dataType: "json",
        success: function (data) {
          if (data.response == "success") {
            $('#contactForm').slideUp(200, 'linear');
            $("#contactSuccess").delay(400).slideDown(300, 'linear');
            $("#contactError").hide();

           // $("#contactForm #name, #contactForm #email, #contactForm #subject, #contactForm #message")
             // fadeOut(400);        
            
          } else {
            $('#contactForm').slideUp(300);
            $("#contactError").fadeIn(300);
            $("#contactSuccess").hide();
            $('.form-send input').attr("value", "Send");
          }
        },
        beforeSend: function() {
          $('#contactForm').slideUp(300);
          $("#contactSending").delay(400).slideDown(300, 'linear');
        }

      });
    }
  });
});
})(jQuery);

