(function($) {
    "use strict"; // Start of use strict

    var SC="object"==typeof SC?SC:{};SC.Widget=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){var r,o,i,u=n(1),a=n(2),c=n(3),s=u.api,l=u.bridge,d=[],f=[],p=/^http(?:s?)/;function E(e){var t,n;for(t=0,n=f.length;t<n&&!1!==e(f[t]);t++);}function v(e){return e.contentWindow?e.contentWindow:e.contentDocument&&"parentWindow"in e.contentDocument?e.contentDocument.parentWindow:null}function _(e){var t,n=[];for(t in e)e.hasOwnProperty(t)&&n.push(e[t]);return n}function S(e,t,n){n.callbacks[e]=n.callbacks[e]||[],n.callbacks[e].push(t)}function h(e,t){var n=!0;return t.callbacks[e]=[],E((function(t){if((t.callbacks[e]||[]).length)return n=!1,!1})),n}function y(e,t,n){var r,o,i=v(n);if(!i.postMessage)return!1;r=n.getAttribute("src").split("?")[0],o=JSON.stringify({method:e,value:t}),"//"===r.substr(0,2)&&(r=window.location.protocol+r),r=r.replace(/http:\/\/(w|wt).soundcloud.com/,"https://$1.soundcloud.com"),i.postMessage(o,r)}function b(e){var t;return E((function(n){if(n.instance===e)return t=n,!1})),t}function g(e){var t;return E((function(n){if(v(n.element)===e)return t=n,!1})),t}function m(e,t){return function(n){var r,o=!!((r=n)&&r.constructor&&r.call&&r.apply),i=b(this),u=!o&&t?n:null,a=o&&!t?n:null;return a&&S(e,a,i),y(e,u,i.element),this}}function R(e,t,n){var r,o,i;for(r=0,o=t.length;r<o;r++)e[i=t[r]]=m(i,n)}function O(e,t,n){return e+"?url="+t+"&"+function(e){var t,n,r=[];for(t in e)e.hasOwnProperty(t)&&(n=e[t],r.push(t+"="+("start_track"===t?parseInt(n,10):n?"true":"false")));return r.join("&")}(n)}function w(e,t,n){var r,o,i=e.callbacks[t]||[];for(r=0,o=i.length;r<o;r++)i[r].apply(e.instance,n);(function(e){var t,n=!1;for(t in a)if(a.hasOwnProperty(t)&&a[t]===e){n=!0;break}return n}(t)||t===s.READY)&&(e.callbacks[t]=[])}function A(e){var t,n,r,o,i;try{n=JSON.parse(e.data)}catch(e){return!1}return t=g(e.source),r=n.method,o=n.value,(!t||P(e.origin)===P(t.domain))&&(t?(r===s.READY&&(t.isReady=!0,w(t,"__LATE_BINDING__"),h("__LATE_BINDING__",t)),r!==s.PLAY||t.playEventFired||(t.playEventFired=!0),r!==s.PLAY_PROGRESS||t.playEventFired||(t.playEventFired=!0,w(t,s.PLAY,[o])),i=[],void 0!==o&&i.push(o),void w(t,r,i)):(r===s.READY&&d.push(e.source),!1))}function P(e){return e.replace(p,"")}window.addEventListener?window.addEventListener("message",A,!1):window.attachEvent("onmessage",A),e.exports=i=function(e,t,n){var i;if((""===(i=e)||i&&i.charCodeAt&&i.substr)&&(e=document.getElementById(e)),!function(e){return!(!e||1!==e.nodeType||"IFRAME"!==e.nodeName.toUpperCase())}(e))throw new Error("SC.Widget function should be given either iframe element or a string specifying id attribute of iframe element.");t&&(n=n||{},e.src=O("http://wt.soundcloud.test:9200/",t,n));var u,a,c=g(v(e));return c&&c.instance?c.instance:(u=d.indexOf(v(e))>-1,a=new r(e),f.push(new o(a,e,u)),a)},i.Events=s,window.SC=window.SC||{},window.SC.Widget=i,o=function(e,t,n){this.instance=e,this.element=t,this.domain=function(e){var t,n,r,o="";"//"===e.substr(0,2)&&(e=window.location.protocol+e);for(r=e.split("/"),t=0,n=r.length;t<n&&t<3;t++)o+=r[t],t<2&&(o+="/");return o}(t.getAttribute("src")),this.isReady=!!n,this.callbacks={}},(r=function(){}).prototype={constructor:r,load:function(e,t){if(e){t=t||{};var n=this,r=b(this),o=r.element,i=o.src,u=i.substr(0,i.indexOf("?"));r.isReady=!1,r.playEventFired=!1,o.onload=function(){n.bind(s.READY,(function(){var e,n=r.callbacks;for(e in n)n.hasOwnProperty(e)&&e!==s.READY&&y(l.ADD_LISTENER,e,r.element);t.callback&&t.callback()}))},o.src=O(u,e,t)}},bind:function(e,t){var n=this,r=b(this);return r&&r.element&&(e===s.READY&&r.isReady?setTimeout(t,1):r.isReady?(S(e,t,r),y(l.ADD_LISTENER,e,r.element)):S("__LATE_BINDING__",(function(){n.bind(e,t)}),r)),this},unbind:function(e){var t,n=b(this);n&&n.element&&(t=h(e,n),e!==s.READY&&t&&y(l.REMOVE_LISTENER,e,n.element))}},R(r.prototype,_(a)),R(r.prototype,_(c),!0)},function(e,t){t.api={LOAD_PROGRESS:"loadProgress",PLAY_PROGRESS:"playProgress",PLAY:"play",PAUSE:"pause",FINISH:"finish",SEEK:"seek",READY:"ready",OPEN_SHARE_PANEL:"sharePanelOpened",CLICK_DOWNLOAD:"downloadClicked",CLICK_BUY:"buyClicked",ERROR:"error"},t.bridge={REMOVE_LISTENER:"removeEventListener",ADD_LISTENER:"addEventListener"}},function(e,t){e.exports={GET_VOLUME:"getVolume",GET_DURATION:"getDuration",GET_POSITION:"getPosition",GET_SOUNDS:"getSounds",GET_CURRENT_SOUND:"getCurrentSound",GET_CURRENT_SOUND_INDEX:"getCurrentSoundIndex",IS_PAUSED:"isPaused"}},function(e,t){e.exports={PLAY:"play",PAUSE:"pause",TOGGLE:"toggle",SEEK_TO:"seekTo",SET_VOLUME:"setVolume",NEXT:"next",PREV:"prev",SKIP:"skip"}}]);

    var iframeElement   = document.querySelector('#music');
    var iframeElementID = iframeElement.id;
    var widget1         = SC.Widget(iframeElement);
    widget1.play();

    const nav = document.querySelector('#navigation');

    function showNav(){
        nav.classList.remove('hideNav');
    }

    function hidewNav(){
        nav.classList.add('hideNav');
    }
    var currPos = window.scrollY;
    document.addEventListener('scroll', () => {
        if (window.scrollY < currPos) {
            //scroll up
            hidewNav();
        } else {
            //scroll down
            showNav();
        }
        currPos = window.scrollY;
    });

    /* Logo Lettering */
    var logo_rotate = $("header .gla_logo_animation").attr('data-rotate');
    if (logo_rotate!='') {
        $("header .gla_logo_animation").addClass('gla_logo_rotate_'+logo_rotate);
    }

    var main_menu_icon = $(".gla_main_menu_icon b");
    main_menu_icon.lettering();
    main_menu_icon.each(function(){
        var i = 2;
        $(this).find('span').each(function(){
            $(this).css('transition-delay','0.'+i+'s');
            i++;
        })
    });

    $("header .gla_logo_animation").lettering();
    $("header .gla_logo_animation span").each(function(){
        var min = 0;
        var max = 50;
        var randomNumber = Math.floor(Math.random()*(max-min+1)+min);
        $(this).css('transition-delay', '0.'+randomNumber+'s');
    });

    /* Map */
    $('.gla_map').on("click", function(e){
        $(this).toggleClass('gla_active_map');
    });

    /*CountTo*/
    $('.gla_timer').appear(function() {
        var e = $(this);
        e.countTo({
            from: 0,
            to: e.html(),
            speed: 1300,
            refreshInterval: 60
        })
    })
    $('.date_picker').datepicker();

    /*Gallery Lightbox*/
    $('.lightbox').magnificPopup({
        type: 'image',
        gallery:{
            enabled:true
        }
    });
    $('.video').magnificPopup({
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">'+
                '<div class="mfp-close"></div>'+
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

            patterns: {
                youtube: {
                    index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                    id: 'v=', // String that splits URL in a two parts, second part should be %id%
                    // Or null - full URL will be returned
                    // Or a function that should return %id%, for example:
                    // id: function(url) { return 'parsed id'; }

                    src: 'http://www.youtube.com/embed/%id%?autoplay=1' // URL that will be set as a source for iframe.
                },
                vimeo: {
                    index: 'vimeo.com/',
                    id: '/',
                    src: 'http://player.vimeo.com/video/%id%?autoplay=1'
                },
                gmaps: {
                    index: '//maps.google.',
                    src: '%id%&output=embed'
                }

                // you may add here more sources

            },

            srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
        }

    });

    /*OWL Intro Slider*/

    if ($('.gla_slider_carousel .gla_slider').length>1) {

        if($('#video_background').length==1) {
            $(".gla_slider_carousel").owlCarousel({
                navigation : true,
                pagination: false,
                responsive: true,
                responsiveRefreshRate : 200,
                responsiveBaseElement:window,
                slideSpeed : 200,
                addClassActive:true,
                paginationSpeed : 200,
                rewindSpeed : 200,
                items:1,
                autoPlay : false,
                touchDrag:true,
                singleItem:true,
                navigationText:['<i class="ti ti-angle-left"></i>','<i class="ti ti-angle-right"></i>'],
                transitionStyle:"fade",
                afterAction: function(current) {
                    current.find('video').get(0).play();
                }
            });
        }else {
            $(".gla_slider_carousel").owlCarousel({
                navigation : true,
                pagination: false,
                responsive: true,
                responsiveRefreshRate : 200,
                responsiveBaseElement:window,
                slideSpeed : 200,
                addClassActive:true,
                paginationSpeed : 200,
                rewindSpeed : 200,
                items:1,
                autoPlay : false,
                touchDrag:true,
                singleItem:true,
                navigationText:['<i class="ti ti-angle-left"></i>','<i class="ti ti-angle-right"></i>'],
                transitionStyle:"fade",
            });
        }
    }



    /*OWL Team*/
    $(".gla_team").owlCarousel({
        navigation : true,
        pagination:false,
        responsive: true,
        responsiveRefreshRate : 200,
        responsiveBaseElement:window,
        slideSpeed : 200,
        addClassActive:true,
        paginationSpeed : 200,
        rewindSpeed : 200,
        items:3,
        itemsTablet:[1000,2],
        itemsMobile : [569,1],
        itemsDesktop:3,
        autoPlay : false,
        touchDrag:true,
        navigationText:['<i class="ti ti-angle-left"></i>','<i class="ti ti-angle-right"></i>']
    });

    $(".gla_team_menu").owlCarousel({
        navigation : true,
        pagination:false,
        responsive: true,
        responsiveRefreshRate : 200,
        responsiveBaseElement:window,
        slideSpeed : 200,
        addClassActive:true,
        paginationSpeed : 200,
        rewindSpeed : 200,
        items:2,
        itemsTablet:[1000,1],
        itemsMobile : [569,1],
        itemsDesktop:2,
        autoPlay : false,
        touchDrag:true,
        navigationText:['<i class="ti ti-angle-left"></i>','<i class="ti ti-angle-right"></i>']
    });

    /* OWL Team Single*/
    $(".gla_team_slider_single").owlCarousel({
        navigation : true,
        responsive: true,
        responsiveRefreshRate : 200,
        responsiveBaseElement:window,
        slideSpeed : 200,
        addClassActive:true,
        paginationSpeed : 200,
        rewindSpeed : 200,
        items:1,
        autoPlay : true,
        singleItem:true,
        autoHeight : true,
        touchDrag:true,
        navigationText:['<i class="ti ti-angle-left"></i>','<i class="ti ti-angle-right"></i>']
    });

    /* OWL Guests Single*/
    $(".gla_guests_slider_single").owlCarousel({
        navigation : true,
        pagination:false,
        responsive: true,
        responsiveRefreshRate : 200,
        responsiveBaseElement:window,
        slideSpeed : 200,
        addClassActive:true,
        paginationSpeed : 200,
        rewindSpeed : 200,
        items:1,
        autoPlay : true,
        singleItem:true,
        autoHeight : true,
        touchDrag:true,
        navigationText:['<i class="ti ti-angle-left"></i>','<i class="ti ti-angle-right"></i>']
    });

    /* OWL PARTNERS*/
    $(".gla_partners").owlCarousel({
        navigation : true,
        responsive: true,
        responsiveRefreshRate : 200,
        responsiveBaseElement:window,
        slideSpeed : 200,
        addClassActive:true,
        paginationSpeed : 200,
        rewindSpeed : 200,
        items:3,
        autoPlay : true,
        autoHeight : true,
        touchDrag:true,
        navigationText:['<i class="ti ti-angle-left"></i>','<i class="ti ti-angle-right"></i>']
    });

    /*OWL Carousel in Shop Item*/
    if ($('.gla_shop_item_slider img').length>1) {
        $(".gla_shop_item_slider").owlCarousel({
            navigation : false,
            responsive: true,
            responsiveRefreshRate : 200,
            responsiveBaseElement:window,
            slideSpeed : 200,
            addClassActive:true,
            paginationSpeed : 200,
            rewindSpeed : 200,
            singleItem:true,
            autoPlay : false,
            touchDrag:true,
            navigationText:['<i class="ti ti-angle-left"></i>','<i class="ti ti-angle-right"></i>']
        });
    }


    /*Instafeed*/

    if ($('#instagram-carousel').length>0) {
        var feed = new Instafeed({
            get: 'user',
            userId: 4075526338,
            accessToken: '4075526338.17dd6bd.0fcd5eb0262e416390ef273090854cc7',
            sortBy: 'most-liked',
            template: '<div class="gla_bordered_block gla_image_bcked_zoom"><a href="{{link}}" target="_blank"></a><div class="gla_image_over gla_image_bck" data-image="{{image}}"></div><div class="gla_box_content text-center"><div class="gla_bottom_title gla_hidden_title"><p>{{caption}}</p></div></div></div>',
            target: 'instagram-carousel',
            limit: 9,
            resolution: 'standard_resolution',
            after: function () {
                $('#instagram-carousel').owlCarousel({
                    items: 3,
                    responsive : {
                        0 : {
                            items:1,
                        },
                        768 : {
                            items:2,
                        },
                        980 : {
                            items:3,
                        }
                    },
                    navigation: true,
                    responsiveRefreshRate: 200,
                    pagination: true,
                    autoPlay: 4000,
                    margin:40,
                    loop:true,
                    navigationText:['<i class="ti ti-angle-left"></i>','<i class="ti ti-angle-right"></i>']
                });
                /* Section Background */
                $('.gla_image_bck').each(function(){
                    var image = $(this).attr('data-image');
                    var gradient = $(this).attr('data-gradient');
                    var color = $(this).attr('data-color');
                    var blend = $(this).attr('data-blend');
                    var opacity = $(this).attr('data-opacity');
                    var position = $(this).attr('data-position');
                    var height = $(this).attr('data-height');
                    if (image){
                        $(this).css('background-image', 'url('+image+')');
                    }
                    if (gradient){
                        $(this).css('background-image', gradient);
                    }
                    if (color){
                        $(this).css('background-color', color);
                    }
                    if (blend){
                        $(this).css('background-blend-mode', blend);
                    }
                    if (position){
                        $(this).css('background-position', position);
                    }
                    if (opacity){
                        $(this).css('opacity', opacity);
                    }
                    if (height){
                        $(this).css('height', height);
                    }

                });
            }

        });
        feed.run();
    }

    /*Divider*/
    $('.gla_divider').each(function(){
        var height = $(this).attr('data-height');
        if (height){
            $(this).css('height', height);
        }

    });

    /* Mobile Menu */
    $('.gla_main_menu').on("click", function(e){
        $(this).next('.gla_main_menu_content').toggleClass('active');
        $(this).next().next('.gla_main_menu_content_menu').toggleClass('active');
        $(this).toggleClass('active');
    });

    /* Section Background */
    $('.gla_image_bck').each(function(){
        var image = $(this).attr('data-image');
        var gradient = $(this).attr('data-gradient');
        var color = $(this).attr('data-color');
        var blend = $(this).attr('data-blend');
        var opacity = $(this).attr('data-opacity');
        var position = $(this).attr('data-position');
        var height = $(this).attr('data-height');
        if (image){
            $(this).css('background-image', 'url('+image+')');
        }
        if (gradient){
            $(this).css('background-image', gradient);
        }
        if (color){
            $(this).css('background-color', color);
        }
        if (blend){
            $(this).css('background-blend-mode', blend);
        }
        if (position){
            $(this).css('background-position', position);
        }
        if (opacity){
            $(this).css('opacity', opacity);
        }
        if (height){
            $(this).css('height', height);
        }

    });



    /* Over */
    $('.gla_over, .gla_head_bck').each(function(){
        var color = $(this).attr('data-color');
        var image = $(this).attr('data-image');
        var opacity = $(this).attr('data-opacity');
        var blend = $(this).attr('data-blend');
        var gradient = $(this).attr('data-gradient');
        if (gradient){
            $(this).css('background-image', gradient);
        }
        if (color){
            $(this).css('background-color', color);
        }
        if (image){
            $(this).css('background-image', 'url('+image+')');
        }
        if (opacity){
            $(this).css('opacity', opacity);
        }
        if (blend){
            $(this).css('mix-blend-mode', blend);
        }
    });
    $('.gla_slide_title, h2').each(function(){
        var color = $(this).attr('data-color');
        if (color){
            $(this).find('span').css('color', color);
        }
    });
    $('.gla_icon_box').each(function(){
        var color = $(this).attr('data-color');
        if (color){
            $(this).find('i').css('color', color);
        }
    });
    $('.skill-bar-content').each(function(){
        var color = $(this).attr('data-color');
        if (color){
            $(this).css('background-image', color);
        }
    });
    $('img.gla_img_shadow').each(function(){
        var color = $(this).attr('data-shadow');
        if (color){
            $(this).css('filter', color);
        }
    });
    $('.gla_page').each(function(){
        var border = $(this).attr('data-border');
        if (border){
            $('.gla_border_top, .gla_border_bottom, .gla_border_left, .gla_border_right, .gla_sml_abs_title').css('background', border);
            $('.gla_bordered_block').css('border-left-color', border);
            $('.gla_border').css('border-bottom-color', border).css('border-top-color', border);
            $('.gla_team_simple .gla_bordered_block').css('border-top-color', border);
        }
    });
    $('.gla_default_menu').each(function(){
        var color = $(this).attr('data-color');
        if (color){
            $(this).find('ul').css('background-color', color);
        }
    });


    /* Map */
    $('.gla_map_over').on("click", function(e){
        $(this).parents('.gla_section').toggleClass('active_map');
    });

    /* Mobile Menu */
    $('.gla_top_menu_mobile_link').on("click", function(e){
        $(this).next('.gla_top_menu_cont').fadeToggle();
        $(this).parents('.gla_light_nav').toggleClass('active');
    });



    $('.gla_countdown').each(function(){
        var year = $(this).attr('data-year');
        var month = $(this).attr('data-month');
        var day = $(this).attr('data-day');
        $(this).countdown({until: new Date(year,month-1,day)});

    });

    $('.gla_countdown_gold').each(function(){
        var year = $(this).attr('data-year');
        var month = $(this).attr('data-month');
        var day = $(this).attr('data-day');
        $(this).countdown({
            until: new Date(year,month-1,day),
            layout: '<span class="countdown-row countdown-show3"><span class="countdown-section"><span class="countdown-amount"><span class="gla_image_day gla_image{d100}"></span><span class="gla_image{d10}"></span><span class="gla_image{d1}"></span></span><span class="countdown-period">Days</span></span><span class="countdown-section"><span class="countdown-amount"><span class="gla_image_hours gla_image{h10}"></span><span class="gla_image{h1}"></span></span><span class="countdown-period">Hours</span></span><span class="countdown-section"><span class="countdown-amount"><span class="gla_image_minutes gla_image{m10}"></span><span class="gla_image{m1}"></span></span><span class="countdown-period">Minutes</span></span><span class="countdown-section"><span class="countdown-amount"><span class="gla_image_sec gla_image{s10}"></span><span class="gla_image{s1}"></span></span><span class="countdown-period">Seconds</span></span></span>	'
        });

    });


    /*Scroll Effect*/
    $('.gla_go').on("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 300);
        e.preventDefault();
    });

    /*Animation Block Delay*/

    $('div[data-animation=animation_blocks]').each(function(){
        var i = 0;
        $(this).find('.gla_icon_box, .skill-bar-content, .gla_anim_box').each(function(){
            $(this).css('transition-delay','0.'+i+'s');
            i++;
        })
    })

    /*Increase-Decrease*/
    $('.increase-qty').on("click", function(e){
        var qtya = $(this).parents('.add-to-cart').find('.qty').val();
        var qtyb = qtya * 1 + 1;
        $(this).parents('.add-to-cart').find('#qty').val(qtyb);
        e.preventDefault();
    });
    $('.decrease-qty').on("click", function(e){
        var qtya = $(this).parents('.add-to-cart').find('#qty').val();
        var qtyb = qtya * 1 - 1;
        if (qtyb < 1) {
            qtyb = 1;
        }
        $(this).parents('.add-to-cart').find('#qty').val(qtyb);
        e.preventDefault();
    });

    /* Shortcode Nav */
    var top_offset = $('header').height() - 1;

    $('#nav-sidebar').onePageNav({
        currentClass: 'current',
        changeHash: false,
        scrollSpeed: 700,
        scrollOffset: top_offset,
        scrollThreshold: 0.5,
        filter: '',
        easing: 'swing',
    });



    /* Bootstrap */
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    /* Anchor Scroll */
    $(window).scroll(function(){
        if ($(window).scrollTop() > 100) {
            $(".gla_logo").addClass('active');
            $('body').addClass('gla_first_step');

        }
        else {
            $('body').removeClass('gla_first_step');
            $(".gla_logo").removeClass('active');
        }
        if ($(window).scrollTop() > 500) {
            $('body').addClass('gla_second_step');
        }
        else {
            $('body').removeClass('gla_second_step');
        }
    });

    /* Fixed for Parallax */
    $(".gla_fixed").css("background-attachment","fixed");


    /* Submenu */
    $('.gla_parent').on({
        mouseenter:function(){
            $(this).find('ul').addClass('active');
        },mouseleave:function(){
            $(this).find('ul').removeClass('active');
        }
    });
    $('.gla_search_parent').on({
        mouseenter:function(){
            $(this).find('ul').addClass('active');
        },mouseleave:function(){
            $(this).find('ul').removeClass('active');
        }
    });

    /* Music */
    $('.gla_music_icon').on('click',function(){
        $('.gla_music_icon_cont').fadeToggle();
    });

    /* Mobile Menu */

    $('.gla_main_menu_content_menu .gla_parent').on("click", function(e){
        $(this).find('ul').slideToggle(300);
    });
    $('.gla_mobile_menu').on("click", function(e){
        $(this).toggleClass('active');
        $('.gla_mobile_menu_hor').toggleClass('active');
    });
    $('.gla_header_search span').on("click", function(e){
        $(this).next('.gla_header_search_cont').fadeToggle();
    });



    var family_group_name_prefix = new Array()
    family_group_name_prefix['a'] = '신랑'
    family_group_name_prefix['b'] = '신부'

    var family_group_name_color = new Array()
    family_group_name_color['a'] = '#8aa5d6'
    family_group_name_color['b'] = '#ee8196'

    $('.bank_popup').on('show', function() {
        debugger
        $(this).css("z-index", parseInt($('.modal-backdrop').css('z-index')) + 1);
    });


    function textarea_resize(obj) {

        // count
        var text = $(obj).val()
        var lines = text.split(/\r|\r\n|\n/)
        var count = lines.length


        // resize
        var default_count = Number($(obj).attr('alt'))
        if (!default_count) default_count = 1

        if (count > 1) $(obj).css('height', 'auto')
        if (count > default_count) $(obj).attr('rows', count)
        else $(obj).attr('rows', default_count)

    }


    function basename(path) {
        return path.split('/').reverse()[0];
    }


    function clipboard_copy(str) {
        var tmpTextarea = document.createElement('textarea')
        tmpTextarea.value = str
        document.body.appendChild(tmpTextarea)
        tmpTextarea.select()
        tmpTextarea.setSelectionRange(0, 9999)
        document.execCommand('copy')
        document.body.removeChild(tmpTextarea)
    }

    $('.bank_txt_view_btn').on('click', function() {
        $('#bank_pop_txt_unm').text($(this).prev().text())

        $('#bank_pop_txt_acc').text($(this).data('bank_name') + ' ' + $(this).attr('data-bank_num'))

        $('#bank_popup').show()
        mask(0.4)

        function mask(opacity) {

            if (opacity == 0) {

                $('#mask').hide()
                $('.mask_over').hide()

            } else {

                //$('#mask').css({ 'width': $(window).width(), 'height': $(window).height() })
                $('#mask').stop().fadeTo('slow', opacity); //$('#mask').fadeIn(1000)
                $('#mask').show()

            }

        }
    })

    // 마스크영역 클릭시 끄기 트리거
    $('#mask').bind('click', function() {
        if (mask_release_allow == true && $(this).css('opacity') > 0.1) {
            if ($('#mcni_wrapper').css('display') != 'none') {
                $('body').css('height', $(document).height() + 'px')
            }
            mask(0)
        }
    })



    // 복사
    $('#bank_pop_copy_btn').on('click', function() {
        var bank_txt = $('#bank_pop_txt_acc').text().replace(/-/g,'')

        if (bank_txt.length > 1) {
            clipboard_copy(bank_txt)
            alert(bank_txt + ' 복사되었습니다')
        }
    })


    // 닫기
    $('#bank_pop_close_btn').on('click', function() {
        $('#bank_popup').hide()
        mask(0)
    })




    $(window).load(function(){

        // Page loader

        $("body").imagesLoaded(function(){
            $(".gla_page_loader div").fadeOut();
            $(".gla_page_loader").delay(200).fadeOut("slow");
        });




        /*Masonry*/
        var $grid = $('.grid').isotope({
            itemSelector: '.grid-item',
            percentPosition: true,
            stagger: 0,
            transitionDuration: '0',
            isAnimated: true,
            masonry: {
                columnWidth: '.grid-item',

            }
        });
        $grid.imagesLoaded().progress( function() {
            $grid.isotope('layout');
        });







        $('.masonry').masonry({
            itemSelector: '.masonry-item',
        });

        $('.filter-button-group').on( 'click', 'a', function() {
            var filterValue = $(this).attr('data-filter');
            $grid.isotope({ filter: filterValue });
        });

        $(window).resize(function(){
            $grid.isotope('layout');
        });





        /* Block Autheight */
        if( !device.tablet() && !device.mobile() ) {
            $('.gla_auto_height').each(function(){
                setEqualHeight($(this).find('> div[class^="col"]'));
            });
        }
        if( device.tablet() && device.landscape() ) {
            $('.gla_auto_height').each(function(){
                setEqualHeight($(this).find('> div[class^="col"]'));
            });
        }

        $(window).resize(function() {
            if( !device.tablet() && !device.mobile() ) {
                $('.gla_auto_height').each(function(){
                    setEqualHeight($(this).find('> div[class^="col"]'));
                });
            }
            if( device.tablet() && device.landscape() ) {
                $('.gla_auto_height').each(function(){
                    setEqualHeight($(this).find('> div[class^="col"]'));
                });
            }
            if( device.tablet() && device.portrait() ) {
                $('.gla_auto_height').each(function(){
                    $(this).find('> div[class^="col"]').height('auto');
                });
            }
        });


        /*Boxes AutoHeight*/
        function setEqualHeight(columns)
        {
            var tallestcolumn = 0;
            columns.each(
                function()
                {
                    $(this).css('height','auto');
                    var currentHeight = $(this).height();
                    if(currentHeight > tallestcolumn)
                    {
                        tallestcolumn = currentHeight;
                    }
                }
            );
            columns.height(tallestcolumn);
        }


        /*SkroolR*/
        if( !device.tablet() && !device.mobile() ) {
            var s = skrollr.init({
                forceHeight: false,
            });
        }


        if( !device.tablet() && !device.mobile() ) {
            $(window).stellar({
                horizontalScrolling: false,
                responsive: true,
                verticalOffset: 50
            });
        }




    });



})(jQuery);





