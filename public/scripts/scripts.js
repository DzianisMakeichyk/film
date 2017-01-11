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
        navText: ['<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 493.4 493.4" style="enable-background:new 0 0 493.4 493.4;" xml:space="preserve"> <g> <path d="M2.9,254.1L112.5,354c3,2.5,6.4,2.9,10,1.4c3.6-1.5,5.4-4.3,5.4-8.3v-64h356.3c2.7,0,4.9-0.9,6.6-2.6c1.7-1.7,2.6-3.9,2.6-6.6v-54.8c0-2.7-0.9-4.9-2.6-6.6c-1.7-1.7-3.9-2.6-6.6-2.6H127.9v-64c0-3.8-1.8-6.6-5.4-8.3c-3.6-1.5-7-1-10,1.7L2.9,240.7c-1.9,1.9-2.9,4.2-2.9,6.8C0,250,1,252.2,2.9,254.1z"/> </g> </svg>','<svg version="1.1" id="Capa_prawa" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 493.356 493.356" style="enable-background:new 0 0 493.356 493.356;"xml:space="preserve"> <g> <path d="M490.498,239.278l-109.632-99.929c-3.046-2.474-6.376-2.95-9.993-1.427c-3.613,1.525-5.427,4.283-5.427,8.282v63.954H9.136c-2.666,0-4.856,0.855-6.567,2.568C0.859,214.438,0,216.628,0,219.292v54.816c0,2.663,0.855,4.853,2.568,6.563c1.715,1.712,3.905,2.567,6.567,2.567h356.313v63.953c0,3.812,1.817,6.57,5.428,8.278c3.62,1.529,6.95,0.951,9.996-1.708l109.632-101.077c1.903-1.902,2.852-4.182,2.852-6.849C493.356,243.367,492.401,241.181,490.498,239.278z"/> </g></svg>'],
    }).on('changed.owl.carousel', syncPosition);

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
        }).on('changed.owl.carousel', syncPosition2);

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

    $('.burger').click(function () {
        $(this).toggleClass('open');
    });
    $(".toggle_menu").click(function() {
        $('.fullscreen-navigation').toggleClass("open");
    });

    $(".shot_movie").click(function () {
        $(".pop_up").fadeIn(300);
        positionPopup();
    });

    $(".pop_up > .movie_cross, .pop_up").click(function () {
        $(".pop_up").fadeOut(300);
    });
});