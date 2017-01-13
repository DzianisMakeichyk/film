$(document).ready(function() {

    var sync1 = $("#sync1");
    var sync2 = $("#sync2");
    var slidesPerPage = 5; //globaly define number of elements per page
    var syncedSecondary = true;

    sync1.owlCarousel({
        items : 1,
        slideSpeed : 5000,
        nav: true,
        autoplay: true,
        dots: false,
        loop: true,
        responsiveRefreshRate : 200,
        navText: ['<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve"><path d="M20,21l-3.058,3L5,12L16.942,0L20,3l-9,9L20,21z"/></svg>','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>'],
    })
    .on('changed.owl.carousel', syncPosition)
    .on('translated.owl.carousel', function() {
      var element = sync1.find(".owl-item.active .writing");
      var text = element.data('text');
      element.html('');

      console.log(text);

      (function write(){
        if( text.length > 0 )
        {
          var firstLetter = text.substr(0,1);
          text = text.substring(1,text.length);

          element.html(element.html() + firstLetter);
          setTimeout(write, 200);
        }
      })();
    });

    sync2
        .on('initialized.owl.carousel', function () {
            sync2.find(".owl-item").eq(0).addClass("current");
        })
        .owlCarousel({
            items : slidesPerPage,
            dots: true,
            nav: true,
            smartSpeed: 200,
            slideSpeed : 500,
            slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
            responsiveRefreshRate : 100
        })
        .on('changed.owl.carousel', syncPosition2);

    function syncPosition(el) {
        //if you set loop to false, you have to restore this next line
        //var current = el.item.index;

        //if you disable loop you have to comment this block
        var count = el.item.count-1;
        var current = Math.round(el.item.index - (el.item.count/2) - .5);

        if(current < 0) {
            current = count;
        }
        if(current > count) {
            current = 0;
        }

        //end block

        sync2
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = sync2.find('.owl-item.active').length - 1;
        var start = sync2.find('.owl-item.active').first().index();
        var end = sync2.find('.owl-item.active').last().index();

        if (current > end) {
            sync2.data('owl.carousel').to(current, 100, true);
        }
        if (current < start) {
            sync2.data('owl.carousel').to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if(syncedSecondary) {
            var number = el.item.index;
            sync1.data('owl.carousel').to(number, 100, true);
        }
    }

    sync2.on("click", ".owl-item", function(e){
        e.preventDefault();
        var number = $(this).index();
        sync1.data('owl.carousel').to(number, 300, true);
    });
//Menu
    $('.burger').click(function () {
        $(this).toggleClass('open');
    });
    $(".toggle_menu").click(function() {
        $('.fullscreen-navigation').toggleClass("open");
    });
//Pop up
    $(".one_shot_movie").click(function () {
        $(".pop_up").fadeIn(300);
    });

    $(".pop_up > .movie_cross, .pop_up").click(function () {
        $(".pop_up").fadeOut(300);
    });
//End Pop Up
    function menuOnScroll(mySection, myMenu, myClass) {
        $(window).scroll(function(){
            var elScroll = $(window).scrollTop();
            $(mySection).each(function(i){
                if ($(this).offset().top <= elScroll) {
                    $(myMenu).removeClass(myClass);
                    $(myMenu).eq(i).addClass(myClass);
                }
            });
        });
    }
    menuOnScroll('section','nav ul li a', 'red');
    function scrollToAnyPoint (navItem) {
        var getAttr;
        $(navItem).click(function(e){
            e.preventDefault();
            getAttr = $(this).attr('href');
            var toSection = $(getAttr).offset().top;
            $("html, body").animate({scrollTop:toSection}, 1000)
        });
    }
//Call Function
    scrollToAnyPoint('nav ul li a');

// movie
    $('.movie_more').click(function() {
        $("html, body").animate({
            scrollTop: $('#movies').offset().top
        });
        $(".pop_up").delay(300).fadeIn(300);
    });

  // YouTube
  var pop_up_video = $('#pop_up_video'),
    pop_up_video_iframe = $('#pop_up_video_iframe'),
    close_pop_up_video_id = $('#pop_up_video_bg'),
    open_pop_up_video_id = $('#open_pop_up_video'),
    mobile_open_pop_up_video_id = $('#mobile_open_pop_up_video');

  // Pop-up Video

  var close_pop_up_video = function(event){
    event.preventDefault();
    pop_up_video_iframe.attr('src', '');
    pop_up_video.css('display', 'none');
  };
  close_pop_up_video_id.on('click', close_pop_up_video);


  var open_pop_up_video = function(event){
    event.preventDefault();
    pop_up_video_iframe.attr('src', 'https://www.youtube.com/embed/daRLyB9rVC4');
    pop_up_video.css('display', 'block');
  };

  open_pop_up_video_id.on('click', open_pop_up_video);
  mobile_open_pop_up_video_id.on('click', open_pop_up_video);

  // End YouTube

  $('#lightgallery').lightGallery({
    pager: true
  });
});